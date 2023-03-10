import { IContact } from "../interfaces/contact.interface";
import { Contact } from "../models/contact.model";
import { ContactsMap } from "../types/map.type";
import { HttpService } from "../commons/http.service";
import { StorageService } from "../commons/storage.service";
import { AgendaRepository } from "../repositories/agenda.repository";
import { v4 as uuidv4 } from "uuid";
import { ServiceTemporarilyUnavailableException } from "../exceptions/service-temporarily-unavailable.exception";

export class AgendaService {
    private _contacts: ContactsMap = new Map();

    constructor(
        private readonly httpService: HttpService<IContact>,
        private readonly localStorageService: StorageService,
        private readonly repositoryService: AgendaRepository<IContact>
    ) {
        this.init();
    }

    public get contacts(): Contact[] {
        return Array.from(this._contacts.values());
    }

    private map = (contacts: IContact[]): void => {
        if (this._contacts.size > 0) {
            this._contacts.clear();
        }

        for (const contact of contacts) {
            this._contacts.set(contact.id, new Contact(contact));
        }
    };

    private init = (): void => {
        this.repositoryService.getAll().then((contacts) => {
            this.map(contacts);
        });
    };

    public load = async (): Promise<void> => {
        try {
            const contacts = await this.httpService.get();
            this.localStorageService.set("contacts", JSON.stringify(contacts));
            this.repositoryService.loadAll(contacts);
            this.map(contacts);
        } catch (error) {
            this._contacts.clear();
            throw new ServiceTemporarilyUnavailableException(error.message);
        }
    };

    public insert = (contact: IContact): Promise<Response> => {
        const newContact = new Contact(contact);

        if (this._contacts.has(newContact.id)) {
            newContact.id = uuidv4();
        }

        try {
            this._contacts.set(newContact.id, newContact);
            this.updateStorage(this.localStorageService);
            this.repositoryService.add(newContact.toJSON());
            return this.httpService.post(contact);
        } catch (error) {
            this._contacts.delete(newContact.id);
            this.updateStorage(this.localStorageService);
            this.repositoryService.delete(newContact.id);
            throw new ServiceTemporarilyUnavailableException(error.message);
        }
    };

    public update = (contact: IContact): Promise<Response> => {
        const contactToUpdateBackup = this._contacts.get(contact.id);
        const contactToUpdate = new Contact(contact);
        contactToUpdate.id = contact.id;
        try {
            this._contacts.delete(contact.id);
            this._contacts.set(contact.id, contactToUpdate);
            this.updateStorage(this.localStorageService);
            this.repositoryService.update(contact.id, contactToUpdate.toJSON());
            return this.httpService.put(contact.id, contact);
        } catch (error) {
            this._contacts.delete(contact.id);
            this._contacts.set(contact.id, contactToUpdateBackup);
            this.updateStorage(this.localStorageService);
            this.repositoryService.update(contact.id, contactToUpdateBackup.toJSON());
            throw new ServiceTemporarilyUnavailableException(error.message);
        }
    };

    public delete = (id: string): Promise<Response> => {
        const contactToDeleteBackup = this._contacts.get(id);
        try {
            this._contacts.delete(id);
            this.updateStorage(this.localStorageService);
            this.repositoryService.delete(id);
            return this.httpService.delete(id);
        } catch (error) {
            this._contacts.set(id, contactToDeleteBackup);
            this.updateStorage(this.localStorageService);
            this.repositoryService.add(contactToDeleteBackup.toJSON());
            throw new ServiceTemporarilyUnavailableException(error.message);
        }
    };

    private updateStorage = (storageService: StorageService): void => {
        storageService.set(
            "contacts",
            JSON.stringify(Array.from(this._contacts.values()))
        );
    };
}
