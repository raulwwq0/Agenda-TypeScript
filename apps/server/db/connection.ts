import mongoose from "mongoose";

export default class Connection {
    static connect() {
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
