import Contact from "../models/contact.model";
import { IContact } from "../schemas/contact.schema";

class ContactController {
    async findAll() {
        const contacts = await Contact.find();
        return contacts;
    }

    async save(contact: IContact) {
        const newContact = new Contact(contact);
        await newContact.save();
        return newContact;
    }
}

export default new ContactController();
