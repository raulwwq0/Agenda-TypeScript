import Contact from "../models/contact.model";

class ContactController {
    async findAll() {
        const contacts = await Contact.find();
        return contacts;
    }
}

export default new ContactController();
