export class StorageService {
    constructor (private readonly storage: Storage) {}

    public get(key: string): string {
        return this.storage.getItem(key);
    }

    public set(key: string, value: string): void {
        this.storage.setItem(key, value);
    }

    public remove(key: string): void {
        this.storage.removeItem(key);
    }
}