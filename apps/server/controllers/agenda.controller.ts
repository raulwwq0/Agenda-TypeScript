import IContact from "../interfaces/contact.interface";
import Contact from "../mongodb/models/contact.model";
import { AgendaService } from "../services/agenda.service";

export class AgendaController {
    constructor(private readonly agendaService: AgendaService) {}

    public findAll(): Promise<IContact[]> {
        return this.agendaService.findAll();
    }

    public save(contact: IContact): Promise<IContact> {
        const newContact = new Contact(contact);
        return this.agendaService.save(newContact);
    }

    public delete(id: string): Promise<void> {
        return Contact.findOneAndDelete({ id })
            .exec()
            .then(() => {});
    }

    public update(contact: IContact): Promise<IContact> {
        return Contact.findOneAndUpdate({ id: contact.id }, contact)
            .exec()
            .then(() => contact);
    }
}
