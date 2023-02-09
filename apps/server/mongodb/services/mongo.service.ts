import { Model } from "mongoose";
import { MongoEntity } from "../entities/mongo.entity";

export class MongoService<Interface> {
    constructor(private readonly mongoEntity: MongoEntity, 
        private readonly model: Model<Interface>) {
            this.mongoEntity.connect();
        }

    async findAll(): Promise<Interface[]> {
        const contacts = await this.model.find({}, { _id: 0, __v: 0});
        return contacts;
    }

    async save(contact: Interface): Promise<Interface> {
        const newContact = new this.model(contact);
        await newContact.save();
        return newContact;
    }

    async delete(id: string): Promise<void> {
        await this.model.findOneAndDelete({ id });
    }

    async update(id: string, contact: Interface): Promise<Interface> {
        const updatedContact = await this.model.findOneAndUpdate({ id }, contact!);
        return updatedContact!;
    }

}