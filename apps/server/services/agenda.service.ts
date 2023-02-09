import IContact from "../interfaces/contact.interface";
import Contact from "../mongodb/models/contact.model";
import { MongoService } from "../mongodb/services/mongo.service";

export class AgendaService {
    constructor(private readonly mongoService: MongoService<IContact>) {}

    public findAll(): Promise<IContact[]> {
        return this.mongoService.findAll();
    }

    public save(contact: IContact): Promise<IContact> {
        const newContact = new Contact(contact);
        return this.mongoService.save(newContact);
    }

    public async delete(id: string): Promise<void> {
        await Contact.findOneAndDelete({ id });
    }

    public async update(contact: IContact): Promise<IContact> {
        const updatedContact = await Contact.findOneAndUpdate({ id: contact.id }, contact);
        return updatedContact!;
    }

}