import { IContact } from "../interfaces/contact.interface";

export const contactCardTemplate = (contact: IContact): string => 
    `<section class="card" data-id="${contact.id}">
        <img src="${contact.img}" alt="${contact.name} ${contact.surname} image">
        <h2 class="name">Name: ${contact.name}</h2>
            <h2 class="surname">Surname: ${contact.surname}</h2>
            <h3 class="age">Age: ${contact.age}</h3>
            ${renderPhones(contact).outerHTML}
            <div class="buttons">
                <span class="button edit-button editButton" data-id="${contact.id}" data-contact='${JSON.stringify(contact, null)}'><i class="fa-solid fa-pen"></i></span>
                <span class="button delete-button deleteButton" data-id="${contact.id}"><i class="fa-solid fa-trash"></i></span>
            </div>
        `;

const renderPhones = (contact: IContact): HTMLElement => {
    const phones = document.createElement("div");
    phones.classList.add("phones");
    if (contact.phones.length === 0) {
        phones.innerHTML = "<h3>Phones:</h3><p>No phones</p>"
        return phones;
    }
    phones.innerHTML = `
        <h3>Phones:</h3>
        <ul></ul>
    `;
    const phonesList = phones.querySelector("ul")!;
    for (const phone of contact.phones) {
        const $phone = document.createElement("li");
        $phone.innerText += phone;
        phonesList.appendChild($phone);
    }
    return phones;
};