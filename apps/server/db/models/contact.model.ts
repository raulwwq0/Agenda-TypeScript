import ContactSchema from "../schemas/contact";
import { model } from "mongoose";

const Contact = model("Contact", ContactSchema);

export default Contact;