import { IPerson } from "../interfaces/person.interface";
import { Person } from "../models/person.model";
import { PeopleMap } from "../types/map.type";
import { HttpService } from "./http.service";
import { v4 as uuidv4 } from 'uuid';

export class PeopleService {
    private _people: PeopleMap = new Map();

    constructor(private readonly httpService: HttpService) {}

    public get people(): Person[] {
        return Array.from(this._people.values());
    }

    public loadPeople = async (): Promise<void> => {
        let people: Person[];
        try {
            people = await this.httpService.get();
        }
        catch {
            this._people.clear();
            throw new Error("Unable to load contacts");
        }

        for (const person of people) {
            this._people.set(person.id, person);
        }
    }

    public insert = async (person: IPerson): Promise<void> => {
        const newPerson = new Person(person);

        if (this._people.has(newPerson.id)){
            newPerson.id = uuidv4();
        }

        try {
            await this.httpService.post(person)
        }
        catch {
            this._people.delete(newPerson.id);
            throw new Error("Unable to add the new contact");
        }

        this._people.set(newPerson.id, newPerson);
    };

    public update = async (person: IPerson): Promise<void> => {
        try {
            await this.httpService.put(person);
        } 
        catch {
            throw new Error("Unable to update the contact");
        }

        const personToUpdate = this._people.get(person.id);

        if (personToUpdate) {
            personToUpdate.name = person.name;
            personToUpdate.surname = person.surname;
            personToUpdate.age = person.age;
            personToUpdate.birthdate = person.birthdate;
            personToUpdate.phones = person.phones;
        }        
    };

    public delete = async (id: string): Promise<void> => {
        try {
            await this.httpService.delete(id);
        } 
        catch {
            throw new Error("Unable to delete the contact");            
        }
        this._people.delete(id);
    }

}