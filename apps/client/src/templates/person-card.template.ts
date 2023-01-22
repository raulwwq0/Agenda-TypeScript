import { IPerson } from "../interfaces/person.interface";

export const personCardTemplate = (person: IPerson): string => 
    `<section class="card" data-id="${person.id}">
        <img src="${person.img}" alt="${person.name} ${person.surname} image">
        <h2 class="name">Name: ${person.name}</h2>
            <h2 class="surname">Surname: ${person.surname}</h2>
            <h3 class="age">Age: ${person.age}</h3>
            ${renderPhones(person).outerHTML}
            <div class="buttons">
                <span class="button edit-button editButton" data-id="${person.id}" data-person='${JSON.stringify(person, null)}'><i class="fa-solid fa-pen"></i></span>
                <span class="button delete-button deleteButton" data-id="${person.id}"><i class="fa-solid fa-trash"></i></span>
            </div>
        `;

const renderPhones = (person: IPerson): HTMLElement => {
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
};