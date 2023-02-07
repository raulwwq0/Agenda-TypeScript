import { ServiceTemporarilyUnavailableException } from "../exceptions/service-temporarily-unavailable.exception";

export class HttpService<T> {
    private API: string = import.meta.env.VITE_API_URL as string;

    constructor() {}

    public get = async () => {
        try {
            const response = await fetch(this.API);
            return await response.json();
        }
        catch {
            throw new ServiceTemporarilyUnavailableException("Can't connect to the server, please try again later");
        }
    }

    public post = async (value: T): Promise<Response> => {
        try {
            return await fetch(this.API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
        }
        catch {
            throw new ServiceTemporarilyUnavailableException("Can't connect to the server, please try again later");
        }
    }

    public put = async (id: string, value: T): Promise<Response> => {
        try {
            return await fetch(`${this.API}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
        }
        catch {
            throw new ServiceTemporarilyUnavailableException("Can't connect to the server, please try again later");
        }
    }

    public delete = async (id: string): Promise<Response> => {
        try {
            return await fetch(`${this.API}/${id}`, {
                method: "DELETE",
            });
        }
        catch {
            throw new ServiceTemporarilyUnavailableException("Can't connect to the server, please try again later");
        }
    }
}