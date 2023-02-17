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
