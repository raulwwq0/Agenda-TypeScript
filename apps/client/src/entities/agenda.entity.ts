import Dexie from "dexie";

export class AgendaEntity extends Dexie {
    constructor(private readonly tableName: string) {
        super("agenda");
        this.version(1).stores({
            [this.tableName]: "id",
        });
    }
}
