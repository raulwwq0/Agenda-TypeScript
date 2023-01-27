import { IContact } from "../interfaces/contact.interface";
import { regExp } from "../utils/regexp.utils";
import { NonValidInputException } from "../exceptions/non-valid-input.exception";

export class Contact implements IContact {
    private _id: string;
    private _img: string;
    private _name: string;
    private _surname: string;
    private _age: number;
    private _birthdate: string;
    private _phones: string[];

    constructor(contact: IContact) {
        this.id = contact.id;
        this.img = contact.img;
        this.name = contact.name;
        this.surname = contact.surname;
        this.age = contact.age;
        this.birthdate = contact.birthdate;
        this.phones = contact.phones;
    }

    public get id(): string {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get img(): string {
        return this._img;
    }

    public set img(img: string) {
        if (img && !regExp.img.test(img)) {
            throw new NonValidInputException("Invalid image url");
        }
        this._img = img;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        if (!name) {
            throw new NonValidInputException("Name is required");
        }
        if (!regExp.name.test(name)) {
            throw new NonValidInputException("Invalid name. Must have at least 3 character");
        }
        this._name = name;
    }

    public get surname(): string {
        return this._surname;
    }

    public set surname(surname: string) {
        if (!surname) {
            throw new NonValidInputException("Surname is required");
        }
        if (!regExp.surname.test(surname)) {
            throw new NonValidInputException("Invalid surname. Must have at least 3 character");
        }
        this._surname = surname;
    }

    public get age(): number {
        return this._age;
    }

    public set age(age: number) {
        this._age = age;
    }

    public get birthdate(): string {
        return this._birthdate;
    }

    public set birthdate(birthdate: string) {
        if (!birthdate) {
            throw new NonValidInputException("Birthdate is required");
        }
        if (!regExp.birthdate.test(birthdate)) {
            throw new NonValidInputException("Invalid birthdate. Format must be dd/mm/yyyy");
        }
        if (!this.isPastDate(this.stringToDate(birthdate))) {
            throw new NonValidInputException("Birthdate must be a past date");
        }
        this._birthdate = birthdate;
    }

    public get phones(): string[] {
        return this._phones;
    }

    public set phones(phones: string[]) {
        phones.find((phone) => {
            if (!regExp.phone.test(phone)) {
                throw new NonValidInputException(`Phone "${phone}" is not valid. Must be 9 digits`);
            }
        });
        this._phones = phones;
    }

    public toJSON = (): IContact => {
        return {
            id: this.id,
            img: this.img,
            name: this.name,
            surname: this.surname,
            age: this.age,
            birthdate: this.birthdate,
            phones: this.phones,
        };
    };

    private isPastDate = (date: Date): boolean => {
        const today = new Date();
        if (date.getFullYear() < today.getFullYear()) {
            return true;
        }
        if (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() < today.getMonth()
        ) {
            return true;
        }
        if (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() < today.getDate()
        ) {
            return true;
        }
        return false;
    };

    private stringToDate = (date: string): Date => {
        const dateParts = date.split("/");
        const [day, month, year] = [
            parseInt(dateParts[0]),
            parseInt(dateParts[1]) - 1,
            parseInt(dateParts[2]),
        ];
        return new Date(year, month, day);
    };
}
