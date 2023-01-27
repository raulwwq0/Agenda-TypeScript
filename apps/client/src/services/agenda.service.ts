import { IContact } from "../interfaces/contact.interface";
import { Contact } from "../models/contact.model";
import { ContactsMap } from "../types/map.type";
import { HttpService } from "../commons/http.service";
import { StorageService } from "../commons/storage.service";
import { v4 as uuidv4 } from 'uuid';
import { ServiceTemporarilyUnavailableException } from "../exceptions/service-temporarily-unavailable.exception";

export class AgendaService {
    private _contacts: ContactsMap = new Map();

    constructor(
        private readonly httpService: HttpService,
        private readonly localStorageService: StorageService
    ) {}

    public get contacts(): Contact[] {
        return Array.from(this._contacts.values());
    }

    public load = async(): Promise<void> => {
        try {
            const contacts: Contact[] = JSON.parse(this.localStorageService.get('contacts')) || await this.httpService.get();
            for (const contact of contacts) {
                this._contacts.set(contact.id, contact);
            }
            this.localStorageService.set('contacts', JSON.stringify(contacts));
        }
        catch (error){
            this._contacts.clear();
            throw new ServiceTemporarilyUnavailableException(error.message)
        }
    }

    public insert = async (contact: IContact): Promise<void> => {
        const newContact = new Contact(contact);

        if (this._contacts.has(newContact.id)){
            newContact.id = uuidv4();
        }

        try {
            this._contacts.set(newContact.id, newContact);
            this.updateStorage(this.localStorageService);
            await this.httpService.post(contact)
        }
        catch (error){
            this._contacts.delete(newContact.id);
            this.updateStorage(this.localStorageService);
            throw new ServiceTemporarilyUnavailableException(error.message)
        }
    };

    public update = async (contact: IContact): Promise<void> => {
        const contactToUpdateBackup = this._contacts.get(contact.id);
        const contactToUpdate = new Contact(contact);
        contactToUpdate.id = contact.id;
        try {
            this._contacts.delete(contact.id);
            this._contacts.set(contact.id, contactToUpdate);
            this.updateStorage(this.localStorageService);
            await this.httpService.put(contact);
        } 
        catch (error){
            this._contacts.delete(contact.id);
            this._contacts.set(contact.id, contactToUpdateBackup);
            this.updateStorage(this.localStorageService);
            throw new ServiceTemporarilyUnavailableException(error.message)
        }      
    };

    public delete = async (id: string): Promise<void> => {
        const contactToDeleteBackup = this._contacts.get(id);
        try {
            this._contacts.delete(id);
            this.updateStorage(this.localStorageService);
            await this.httpService.delete(id);
        } 
        catch (error){
            this._contacts.set(id, contactToDeleteBackup);
            this.updateStorage(this.localStorageService);
            throw new ServiceTemporarilyUnavailableException(error.message)
        }
    }

    private updateStorage = (storageService: StorageService): void => {
        storageService.set('contacts', JSON.stringify(Array.from(this._contacts.values())));
    }
}