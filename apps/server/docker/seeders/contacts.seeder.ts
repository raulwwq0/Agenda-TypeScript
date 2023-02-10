import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { MongoEntity } from "../../mongodb/entities/mongo.entity";

dotenv.config();

const numberOfContacts = parseInt(process.argv[2]) || 10;

function dateFormatter(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dayString = day < 10 ? `0${day}` : `${day}`;
    const monthString = month < 10 ? `0${month}` : `${month}`;

    return `${dayString}/${monthString}/${year}`;
}

function calculateAge(date: Date) {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

async function seedContacts() {
    const mongoEntity = new MongoEntity();

    try {
        mongoEntity.connect();
        await mongoose.connection.collection("contacts").deleteMany({});
        console.log("Generating contacts...");
        const contacts = [...Array(numberOfContacts)].map(() => {
            const name = faker.name.firstName();
            const surname = faker.name.lastName();
            const birthdate = faker.date.birthdate();
            return {
                id: faker.datatype.uuid(),
                name: name.length > 3 ? name : "John",
                surname: surname.length > 3 ? surname : "Doe",
                age: calculateAge(birthdate),
                birthdate: dateFormatter(birthdate),
                phones: [
                    faker.phone.number('#########'),
                    faker.phone.number('#########'),
                ],
                img: faker.internet.avatar(),
            }
        });
        console.log("Seeding contacts...");
        await mongoose.connection.collection("contacts").insertMany(contacts);
        console.log("Contacts seeded");
        mongoEntity.disconnect();

    } catch (err) {
        console.log(err);
    }
}

seedContacts();