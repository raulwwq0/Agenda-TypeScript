import mongoose from "mongoose";

export default class MongoEntity {
    static connect() {
        if (mongoose.connection.readyState === 1) {
            console.log("Database already connected");
            return;
        }

        mongoose.set('strictQuery', false);

        mongoose
            .connect(process.env.MONGODB_URI as string)
            .then(() => console.log("Database connected"))
            .catch((error) => console.log(error));
    }

    static disconnect() {
        mongoose.connection
            .close()
            .then(() => console.log("Database disconnected"))
            .catch((error) => console.log(error));
    }
}
