print('Start #################################################################');

db = db.getSiblingDB('agenda');

db.createUser(
    {
        user: "root",
        pwd: "toor",
        roles: [
            {
                role: "readWrite",
                db: "agenda"
            }
        ]
    }
);

db.createCollection('contacts');

print('End #################################################################');
