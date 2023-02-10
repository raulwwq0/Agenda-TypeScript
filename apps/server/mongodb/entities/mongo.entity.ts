import mongoose from "mongoose";

export class MongoEntity {
    constructor() {}

    public connect() {
        if (mongoose.connection.readyState === 1) {
            console.log("Database already connected");
            return;
        }

        mongoose.set('strictQuery', false);

        mongoose
            .connect(process.env.MONGODB_URI as string, {
                user: process.env.MONGODB_USER,
                pass: process.env.MONGODB_PASSWORD,
            })
            .then(() => console.log("Database connected"))
            .catch((error) => console.log(error));
    }

    public disconnect() {
        mongoose.connection
            .close()
            .then(() => console.log("Database disconnected"))
            .catch((error) => console.log(error));
    }
}
