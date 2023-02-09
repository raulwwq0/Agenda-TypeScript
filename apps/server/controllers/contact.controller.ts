import Contact from "../mongodb/models/contact.model";
import IContact from "../interfaces/contact.interface";

class ContactController {
    async findAll(): Promise<IContact[]> {
        const contacts = await Contact.find({}, { _id: 0, __v: 0});
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
