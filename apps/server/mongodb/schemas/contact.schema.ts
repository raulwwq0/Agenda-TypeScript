import { Schema } from 'mongoose';
import IContact from '../../interfaces/contact.interface';

const ContactSchema = new Schema<IContact>({
    id: { type: String, required: true },
    img: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
    birthdate: { type: String, required: true },
    phones: { type: [String], required: true }
});

export default ContactSchema;
