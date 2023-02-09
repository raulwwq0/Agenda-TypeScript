import ContactSchema from "../schemas/contact.schema";
import { model } from "mongoose";

const Contact = model("Contact", ContactSchema, "contacts");

export default Contact;