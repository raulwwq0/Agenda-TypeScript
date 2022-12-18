import { IPerson } from "../interfaces/person.interface";

export class HttpService {
    private API: string = "http://localhost:3000/people";

    constructor() {}

    public get = async () => {
        const response = await fetch(this.API);
        const people = await response.json();
        return people;
    }

    public post = async (person: IPerson): Promise<Response> => {
        return await fetch(this.API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
    }

    public put = async (person: IPerson): Promise<Response> => {
        return await fetch(`${this.API}/${person.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
    }

    public delete = async (id: string): Promise<Response> => {
        return await fetch(`${this.API}/${id}`, {
            method: "DELETE",
        });
    }
}