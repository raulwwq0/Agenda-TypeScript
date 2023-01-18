import { Person } from "../models/person.model";

export class PersonCard {
    constructor(private readonly person: Person) { }

    public render = (): HTMLElement => {
        const card = document.createElement("section");
        card.classList.add("card", "animate__animated","animate__fadeIn");
        card.innerHTML = `
            <img src="${this.person.img}" alt="${this.person.name} ${this.person.surname} image">
            <h2 class="name">Name: ${this.person.name}</h2>
            <h2 class="surname">Surname: ${this.person.surname}</h2>
            <h3 class="age">Age: ${this.person.age}</h3>
            ${this.renderPhones().outerHTML}
            <div class="buttons">
                <span class="button edit-button editButton" data-person='${JSON.stringify(this.person, null)}'><i class="fa-solid fa-pen"></i></span>
                <span class="button delete-button deleteButton" data-id="${this.person.id}"><i class="fa-solid fa-trash"></i></span>
            </div>
        `;
        return card;
    }

    private renderPhones = (): HTMLElement => {
        const phones = document.createElement("div");
        phones.classList.add("phones");
        if (this.person.phones.length === 0) {
            phones.innerHTML = "<h3>Phones:</h3><p>No phones</p>"
            return phones;
        }
        phones.innerHTML = `
            <h3>Phones:</h3>
            <ul></ul>
        `;
        const phonesList = phones.querySelector("ul")!;
        for (const phone of this.person.phones) {
            const $phone = document.createElement("li");
            $phone.innerText += phone;
            phonesList.appendChild($phone);
        }
        return phones;
    }

}