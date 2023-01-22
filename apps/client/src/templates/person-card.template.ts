import { Person } from "../models/person.model";

export const personCardTemplate = (person: Person): string => 
    `<section class="card animate__animated animate__fadeIn animate__delay-1s animate__faster">
        <img src="${person.img}" alt="${person.name} ${person.surname} image">
        <h2 class="name">Name: ${person.name}</h2>
            <h2 class="surname">Surname: ${person.surname}</h2>
            <h3 class="age">Age: ${person.age}</h3>
            ${renderPhones(person).outerHTML}
            <div class="buttons">
                <span class="button edit-button editButton" data-person='${JSON.stringify(person, null)}'><i class="fa-solid fa-pen"></i></span>
                <span class="button delete-button deleteButton" data-id="${person.id}"><i class="fa-solid fa-trash"></i></span>
            </div>
        `;

const renderPhones = (person: Person): HTMLElement => {
    const phones = document.createElement("div");
    phones.classList.add("phones");
    if (person.phones.length === 0) {
        phones.innerHTML = "<h3>Phones:</h3><p>No phones</p>"
        return phones;
    }
    phones.innerHTML = `
        <h3>Phones:</h3>
        <ul></ul>
    `;
    const phonesList = phones.querySelector("ul")!;
    for (const phone of person.phones) {
        const $phone = document.createElement("li");
        $phone.innerText += phone;
        phonesList.appendChild($phone);
    }
    return phones;
}


