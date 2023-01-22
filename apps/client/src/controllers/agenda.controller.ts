import { PeopleService } from "../services/people.service";
import { PeopleCardsView } from "../views/people-cards.view";
import { FormsView } from "../views/forms.view";
import { IPerson } from "../interfaces/person.interface";
import { FormInputs } from "../types/form-inputs.type";
import { v4 as uuidv4 } from 'uuid';

export class AgendaController {

    constructor(
        private readonly peopleService: PeopleService,
        private readonly peopleCardsView: PeopleCardsView,
        private readonly formsView: FormsView,
    ) {
        this.init();
    }

    private init = async (): Promise<void> => {
        try {
            await this.peopleService.loadPeople();
            this.peopleCardsView.renderCards(this.peopleService.people);
            this.peopleCardsView.bindDeleteButtons(this.handlerDeleteButton);
            this.peopleCardsView.bindEditButtons(this.handlerEditButton);
            this.formsView.render();
            this.formsView.bindInsertButton(this.handlerInsertButton);
            this.formsView.bindUpdateButton(this.handlerUpdateButton);
        }
        catch (error) {
            this.formsView.showErrors(error);
        }
    }

    private inputsToPerson = (formInputs: FormInputs, id: string = uuidv4()): IPerson => ({
        id: id,
        img: formInputs.img.value || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
        name: formInputs.name.value,
        surname: formInputs.surname.value,
        age: this.calculateAge(this.stringToDate(formInputs.birthdate.value)),
        birthdate: formInputs.birthdate.value,
        phones: formInputs.phones.value.split(",")
                                       .map(phone => phone.trim())
                                       .filter(phone => phone !== ""),
    });

    public handlerInsertButton = async (formInputs: FormInputs): Promise<void> => {
        const person = this.inputsToPerson(formInputs);
        try {
            await this.peopleService.insert(person);
            this.peopleCardsView.renderCard(person);
            this.peopleCardsView.bindDeleteButton(person.id, this.handlerDeleteButton);
            this.peopleCardsView.bindEditButton(person.id, this.handlerEditButton);
            this.formsView.insertSuccessful(person);
        }
        catch (error) {
            this.formsView.showErrors(error);
        }

    }

    public handlerDeleteButton = async (id: string): Promise<void> => {
        try {
            await this.peopleService.delete(id);
            this.peopleCardsView.deleteCard(id);
        }
        catch (error) {
            this.formsView.showErrors(error);
        }
    }

    public handlerEditButton = (person: IPerson): void => {
        this.formsView.loadPersonDataToUpdate(person);
    }

    public handlerUpdateButton = async (id:string, formInputs: FormInputs): Promise<void> => {
        const person = this.inputsToPerson(formInputs, id);
        try {
            await this.peopleService.update(person);
            this.peopleCardsView.updateCard(person);
            this.formsView.updateSuccessful(person);
        }
        catch (error) {
            this.formsView.showErrors(error);
        }
    }

    private stringToDate = (date: string): Date => {
        const dateParts = date.split("/");
        const [day, month, year] = [parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2])];
        return new Date(year, month, day);
    };

    private calculateAge = (birthdate: Date): number => {
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
}