import { Model } from "mongoose";
import { MongoEntity } from "../entities/mongo.entity";

export class MongoService<Interface> {
    constructor(
        private readonly mongoEntity: MongoEntity,
        private readonly model: Model<Interface>
    ) {
        this.mongoEntity.connect();
    }

    public findAll(): Promise<Interface[]> {
        return this.model.find({}, { _id: 0, __v: 0 }).exec();
    }

    public save(contact: Interface): Promise<Interface> {
        const newContact = new this.model(contact);
        return newContact.save().then(() => newContact);
    }

    public delete(id: string): Promise<void> {
        return this.model
            .findOneAndDelete({ id })
            .exec()
            .then(() => {});
    }

    public update(id: string, contact: Interface): Promise<Interface> {
        return this.model
            .findOneAndUpdate({ id }, contact!)
            .exec()
            .then(() => contact);
    }
}
