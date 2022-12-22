import mongoose from "mongoose";

export default class Connection {
    static connect() {
        if (mongoose.connection.readyState === 1) {
            console.log("Database already connected");
            return;
        }

        mongoose
            .connect(process.env.MONGODB_URI as string)
            .then(() => console.log("Database connected"))
            .catch((error) => console.log(error));

            mongoose.connection.on('open', function (ref) {
                console.log('Connected to mongo server.');
                //trying to get collection names
                mongoose.connection.db.listCollections().toArray(function (err, names) {
                    console.log(names); // [{ name: 'dbname.myCollection' }]
                    module.exports.Collection = names;
                });
            })
    }

    static disconnect() {
        mongoose.connection
            .close()
            .then(() => console.log("Database disconnected"))
            .catch((error) => console.log(error));
    }
}
