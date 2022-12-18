import { FormInputs } from "../types/form-inputs.type";

type Errors = {
    [key: string]: string;
};

export class FormsService {
    private readonly expReg = {
        name: /^[a-z][a-z\s]{2,254}$/i,
        surname: /^[a-z][a-z\s]{2,254}$/i,
        birthdate:
            /((0[1-9]|[12][0-9]|3[01])[\/.](0[13578]|1[02])[\/.](18|19|20)[0-9]{2})|((0[1-9]|[12][0-9]|30)[\/.](0[469]|11)[\/.](18|19|20)[0-9]{2})|((0[1-9]|1[0-9]|2[0-8])[\/.](02)[\/.](18|19|20)[0-9]{2})|(29[\/.]02[\/.](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000))/,
        phone: /^\d{9}$/,
        img: /(http(s?):)([/|.|\w|\s|-])*/
    };

    constructor() {}

    public isValidForm = (formInputs: FormInputs): string => {
        const errors: Errors = {
            name: this.isValidNameOrSurname(formInputs.name.value, "name"),
            surname: this.isValidNameOrSurname(formInputs.surname.value, "surname"),
            birthdate: this.isValidbirthdate(formInputs.birthdate.value),
            phones: this.areValidPhones(formInputs.phones.value),
            img: this.isValidImg(formInputs.img.value),
        };
        const errorMessages = Object.values(errors).filter((error) => error !== "");
        if (errorMessages.length > 0) {
            return errorMessages.join(" - ");
        }
        return "";
    };

    private isValidNameOrSurname = (value: string, type: string): string => {
        if (!value) {
            return `${this.capitalize(type)} is required`;
        }
        if (!this.expReg[type].test(value)) {
            return `${this.capitalize(type)} is not valid. Must be at least 3 characters`;
        }
        return "";
    };

    private isValidbirthdate = (date: string): string => {

        if (!date) {
            return "birthdate is required";
        }
        if (!this.expReg.birthdate.test(date)) {
            return "birthdate is not valid. Format must be dd/mm/yyyy";
        }
        if (!this.isPastDate(this.stringToDate(date))) {
            return "birthdate must be a past date";
        }
        return "";
    };

    private areValidPhones = (phonesInput: string): string => {
        const phones = phonesInput.split(",")
                             .map((phone) => phone.trim())
                             .filter((phone) => phone !== "");
        for (const phone of phones) {
            if (!this.expReg.phone.test(phone)) {
                return "Phone is not valid. Must be 9 digits";
            }
        }
        return "";
    };

    private isValidImg = (value: string): string => {
        if (value && !this.expReg.img.test(value)) {
            return "Image is not valid. Must be a URL.";
        }
        return "";
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

    public stringToDate = (date: string): Date => {
        const dateParts = date.split("/");
        const [day, month, year] = [parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2])];
        return new Date(year, month, day);
    }

    public dateToString = (date: Date): string => {
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    public calculateAge = (birthdate: Date): number => {
        const today = new Date();
        const age = today.getFullYear() - birthdate.getFullYear();
        const month = today.getMonth() - birthdate.getMonth();
        if (
            month < 0 ||
            (month === 0 && today.getDate() < birthdate.getDate())
        ) {
            return age - 1;
        }
        return age;
    };

    public calculatebirthdate = (age: number): string => {
        const today = new Date();
        const birthdate = new Date(today.getFullYear() - age, today.getMonth(), today.getDate());
        return this.dateToString(birthdate);
    };

    private capitalize = (value: string): string => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}
