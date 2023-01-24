import { IPerson } from "../interfaces/person.interface";
import { Person } from "../models/person.model";
import { PeopleMap } from "../types/map.type";
import { HttpService } from "./http.service";
import { StorageService } from "./storage.service";
import { v4 as uuidv4 } from 'uuid';
import { ServiceTemporarilyUnavailableException } from "../exceptions/service-temporarily-unavailable.exception";

export class PeopleService {
    private _people: PeopleMap = new Map();

    constructor(
        private readonly httpService: HttpService,
        private readonly localStorageService: StorageService
    ) {}

    public get people(): Person[] {
        return Array.from(this._people.values());
    }

    public loadPeople = async(): Promise<void> => {
        try {
            const people: Person[] = JSON.parse(this.localStorageService.get('people')) || await this.httpService.get();
            for (const person of people) {
                this._people.set(person.id, person);
            }
            this.localStorageService.set('people', JSON.stringify(people));
        }
        catch (error){
            this._people.clear();
            throw new ServiceTemporarilyUnavailableException(error.message)
        }
    }

    public insert = async (person: IPerson): Promise<void> => {
        const newPerson = new Person(person);

        if (this._people.has(newPerson.id)){
            newPerson.id = uuidv4();
        }

        try {
            this._people.set(newPerson.id, newPerson);
            this.updateStorage(this.localStorageService);
            await this.httpService.post(person)
        }
        catch (error){
            this._people.delete(newPerson.id);
            this.updateStorage(this.localStorageService);
            throw new ServiceTemporarilyUnavailableException(error.message)
        }
    };

    public update = async (person: IPerson): Promise<void> => {
        const personToUpdateBackup = this._people.get(person.id);
        const personToUpdate = new Person(person);
        personToUpdate.id = person.id;
        try {
            this._people.delete(person.id);
            this._people.set(person.id, personToUpdate);
            this.updateStorage(this.localStorageService);
            await this.httpService.put(person);
        } 
        catch (error){
            this._people.delete(person.id);
            this._people.set(person.id, personToUpdateBackup);
            this.updateStorage(this.localStorageService);
            throw new ServiceTemporarilyUnavailableException(error.message)
        }      
    };

    public delete = async (id: string): Promise<void> => {
        const personToDeleteBackup = this._people.get(id);
        try {
            this._people.delete(id);
            this.updateStorage(this.localStorageService);
            await this.httpService.delete(id);
        } 
        catch (error){
            this._people.set(id, personToDeleteBackup);
            this.updateStorage(this.localStorageService);
            throw new ServiceTemporarilyUnavailableException(error.message)
        }
    }

    private updateStorage = (storageService: StorageService): void => {
        storageService.set('people', JSON.stringify(Array.from(this._people.values())));
    }
}