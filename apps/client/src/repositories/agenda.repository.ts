export class AgendaRepository {
    constructor(private readonly db: any, private readonly store: string) {}

    public async getAll(): Promise<any> {
        return await this.db[this.store].toArray();
    }

    public loadAll(values: any[]): Promise<any> {
        return this.db[this.store].count().then(async (count: Number) => {
            if (count === 0) {
                this.db[this.store].bulkAdd(values);
            }
        });
    }

    public async add(value: any): Promise<any> {
        return await this.db[this.store].add(value);
    }

    public async update(value: any): Promise<any> {
        return await this.db[this.store].update(value.id, value);
    }

    public async delete(id: string): Promise<any> {
        return await this.db[this.store].delete(id);
    }
}
