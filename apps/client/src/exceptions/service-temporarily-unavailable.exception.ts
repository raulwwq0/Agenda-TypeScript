import { HttpException } from "./http.exception";

export class ServiceTemporarilyUnavailableException extends HttpException {
    constructor(message: string) {
        super(message);
        this.name = 'ServiceTemporarilyUnavailableException';
    }
}