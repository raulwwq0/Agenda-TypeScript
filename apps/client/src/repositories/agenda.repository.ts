export class AgendaRepository<T> {
    constructor(private readonly db: any, private readonly store: string) {}

    public getAll(): Promise<T[]> {
        return this.db[this.store].toArray();
    }

    public loadAll(values: T[]): Promise<Response> {
        return this.db[this.store].count().then((count: Number) => {
            if (count === 0) {
                this.db[this.store].bulkAdd(values);
            }
        });
    }

    public add(value: T): Promise<Response> {
        return this.db[this.store].add(value);
    }

    public update(id: string, value: T): Promise<Response> {
        return this.db[this.store].update(id, value);
    }

    public delete(id: string): Promise<Response> {
        return this.db[this.store].delete(id);
    }
}
