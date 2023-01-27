import { AgendaService } from "../services/agenda.service";
import { ContactCardsView } from "../views/contact-cards.view";
import { FormsView } from "../views/forms.view";
import { IContact } from "../interfaces/contact.interface";
import { FormInputs } from "../types/form-inputs.type";
import { v4 as uuidv4 } from 'uuid';

export class AgendaController {

    constructor(
        private readonly agendaService: AgendaService,
        private readonly contactsCardsView: ContactCardsView,
        private readonly formsView: FormsView,
    ) {
        this.init();
    }

    private init = async (): Promise<void> => {
        try {
            this.renderCards();
            this.formsView.render();
            this.formsView.bindInsertButton(this.handlerInsertButton);
            this.formsView.bindUpdateButton(this.handlerUpdateButton);
            await this.agendaService.load()
                .then(() => {
                    this.renderCards();
                });
        }
        catch (error) {
            this.formsView.showErrors(error);
        }
    }

    private renderCards = (): void => {
        this.contactsCardsView.renderCards(this.agendaService.contacts);
        this.contactsCardsView.bindDeleteButtons(this.handlerDeleteButton);
        this.contactsCardsView.bindEditButtons(this.handlerEditButton);
    }

    private inputsToContact = (formInputs: FormInputs, id: string = uuidv4()): IContact => ({
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
        const contact = this.inputsToContact(formInputs);
        try {
            await this.agendaService.insert(contact);
            this.contactsCardsView.renderCard(contact);
            this.contactsCardsView.bindDeleteButton(contact.id, this.handlerDeleteButton);
            this.contactsCardsView.bindEditButton(contact.id, this.handlerEditButton);
            this.formsView.insertSuccessful(contact);
        }
        catch (error) {
            this.formsView.showErrors(error);
        }

    }

    public handlerDeleteButton = async (id: string): Promise<void> => {
        try {
            await this.agendaService.delete(id);
            this.contactsCardsView.deleteCard(id);
        }
        catch (error) {
            this.formsView.showErrors(error);
        }
    }

    public handlerEditButton = (contact: IContact): void => {
        this.formsView.loadContactDataToUpdate(contact);
    }

    public handlerUpdateButton = async (id:string, formInputs: FormInputs): Promise<void> => {
        const contact = this.inputsToContact(formInputs, id);
        try {
            await this.agendaService.update(contact);
            this.contactsCardsView.updateCard(contact);
            this.contactsCardsView.bindDeleteButton(contact.id, this.handlerDeleteButton);
            this.contactsCardsView.bindEditButton(contact.id, this.handlerEditButton);
            this.formsView.updateSuccessful(contact);
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