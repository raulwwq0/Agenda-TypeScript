import { IPerson } from "../interfaces/person.interface";

export class Person implements IPerson {
    private _id: string;
    private _img: string;
    private _name: string;
    private _surname: string;
    private _age: number;
    private _birthdate: string;
    private _phones: string[];

    constructor(person: IPerson) {
        this._id = person.id;
        this._img = person.img;
        this._name = person.name;
        this._surname = person.surname;
        this._age = person.age;
        this._phones = person.phones;
    }

    public get id(): string {
        return this._id;
    }

    public get img(): string {
        return this._img;
    }

    public get name(): string {
        return this._name;
    }

    public get surname(): string {
        return this._surname;
    }

    public get age(): number {
        return this._age;
    }

    public get birthdate(): string {
        return this._birthdate;
    }

    public get phones(): string[] {
        return this._phones;
    }

    public set id(id: string) {
        this._id = id;
    }

    public set img(img: string) {
        this._img = img;
    }

    public set name(name: string) {
        this._name = name;
    }

    public set surname(surname: string) {
        this._surname = surname;
    }

    public set age(age: number) {
        this._age = age;
    }

    public set birthdate(birthdate: string) {
        this._birthdate = birthdate;
    }

    public set phones(phones: string[]) {
        this._phones = phones;
    }
}