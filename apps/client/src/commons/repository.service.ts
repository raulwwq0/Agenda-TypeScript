export class RepositoryService {
    constructor(private readonly db: any, private readonly store: string) {}

    public async getAll(): Promise<any> {
        return await this.db[this.store].toArray();
    }

    public loadAll(contacts: any[]): Promise<any> {
        return this.db[this.store].count().then(async (count: Number) => {
            if (count === 0) {
                this.db[this.store].bulkAdd(contacts);
            }
        });
    }

    public async add(contact: any): Promise<any> {
        return await this.db[this.store].add(contact);
    }

    public async update(contact: any): Promise<any> {
        return await this.db[this.store].update(contact.id, contact);
    }

    public async delete(id: string): Promise<any> {
        return await this.db[this.store].delete(id);
    }
}
