export class NonValidFormException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NonValidFormException';
    }
}