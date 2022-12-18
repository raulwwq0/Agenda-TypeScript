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
        const people = await this.httpService.get();
        for (const person of people) {
            this._people.set(person.id, person);
        }
    }

    public insert = async (person: IPerson): Promise<Response> => {
        const newPerson = new Person(person);

        if (this._people.has(newPerson.id)){
            newPerson.id = uuidv4();
        }

        this._people.set(newPerson.id, newPerson);
        return this.httpService.post(person);
    };

    public update = async (person: IPerson): Promise<Response> => {
        const personToUpdate = this._people.get(person.id);

        if (personToUpdate) {
            personToUpdate.name = person.name;
            personToUpdate.surname = person.surname;
            personToUpdate.age = person.age;
            personToUpdate.birthdate = person.birthdate;
            personToUpdate.phones = person.phones;
        }
        
        return this.httpService.put(person);
    };

    public delete = async (id: string): Promise<Response> => {
        this._people.delete(id);
        return this.httpService.delete(id);
    }

}