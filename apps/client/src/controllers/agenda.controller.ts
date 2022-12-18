import { PeopleService } from "../services/people.service";
import { PeopleCardsView } from "../views/people-cards.view";
import { FormsView } from "../views/forms.view";
import { FormsService } from "../services/forms.service";
import { IPerson } from "../interfaces/person.interface";
import { FormInputs } from "../types/form-inputs.type";
import { v4 as uuidv4 } from 'uuid';

export class AgendaController {

    constructor(
        private readonly peopleService: PeopleService,
        private readonly peopleCardsView: PeopleCardsView,
        private readonly formsView: FormsView,
        private readonly formsService: FormsService,
    ) {
        this.loader();
        this.formsView.render();
        this.formsView.bindInsertButton(this.handlerInsertButton);
        this.formsView.bindUpdateButton(this.handlerUpdateButton);
    }

    private loader = (): void => {
        this.peopleService.loadPeople()
            .then(() => this.peopleCardsView.renderCards(this.peopleService.people))
            .then(() => this.peopleCardsView.bindDeleteButtons(this.handlerDeleteButton))
            .then(() => this.peopleCardsView.bindEditButtons(this.handlerEditButton));
    }

    private inputsToPerson = (formInputs: FormInputs, id: string = uuidv4()): IPerson => ({
        id: id,
        img: formInputs.img.value || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
        name: formInputs.name.value,
        surname: formInputs.surname.value,
        age: this.formsService.calculateAge(this.formsService.stringToDate(formInputs.birthdate.value)),
        birthdate: formInputs.birthdate.value,
        phones: formInputs.phones.value.split(",")
                                       .map(phone => phone.trim())
                                       .filter(phone => phone !== ""),
    });   
    
    private hasErrors = (formInputs: FormInputs): boolean => {
        const errorMessage = this.formsService.isValidForm(formInputs);
        if (errorMessage) {
            this.formsView.showErrors(errorMessage);
            return true;
        }
        return false;
    }

    public handlerInsertButton = (formInputs: FormInputs): void => {
        if (this.hasErrors(formInputs)) {
            return;
        }
        const person = this.inputsToPerson(formInputs);
        this.peopleService.insert(person)
            .then(() => this.formsView.insertSuccessful(person))
            .then(() => this.loader());
    }

    public handlerDeleteButton = (id: string): void => {
        this.peopleService.delete(id)
            .then(() => this.loader());
    }

    public handlerEditButton = (person: IPerson): void => {
        this.formsView.loadPersonDataToUpdate(person);
    }

    public handlerUpdateButton = (id:string, formInputs: FormInputs): void => {
        if (this.hasErrors(formInputs)) {
            return;
        }
        const person = this.inputsToPerson(formInputs, id);
        this.peopleService.update(person)
            .then(() => this.formsView.updateSuccessful(person))
            .then(() => this.loader());
    }
}