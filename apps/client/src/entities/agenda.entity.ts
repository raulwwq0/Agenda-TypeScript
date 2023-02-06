import Dexie from "dexie";

export class AgendaEntity<T> extends Dexie {
    public contacts: Dexie.Table<T, string>;

    constructor() {
        super("agenda");
        this.version(1).stores({
            contacts: "++id, name, surname, phone, email, address",
        });
    }
}
