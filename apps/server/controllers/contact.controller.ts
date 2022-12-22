import Contact from "../models/contact.model";
import { IContact } from "../schemas/contact.schema";

class ContactController {
    async findAll(): Promise<IContact[]> {
        const contacts = await Contact.find();
        return contacts;
    }

    async save(contact: IContact): Promise<IContact> {
        const newContact = new Contact(contact);
        await newContact.save();
        return newContact;
    }

    async delete(id: string): Promise<void> {
        await Contact.findOneAndDelete({ id });
    }

    async update(contact: IContact): Promise<IContact> {
        const updatedContact = await Contact.findOneAndUpdate({ id: contact.id }, contact);
        return updatedContact!;
    }

}

export default new ContactController();
