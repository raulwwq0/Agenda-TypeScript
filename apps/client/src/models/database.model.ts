import Dexie from "dexie";
import { IContact } from "../interfaces/contact.interface";

export class Agenda extends Dexie {
    public contacts!: Dexie.Table<IContact, number>;

    constructor () {
        super("agenda");
        this.version(1).stores({
            contacts: '++id, first, last',
        });
    }
}
