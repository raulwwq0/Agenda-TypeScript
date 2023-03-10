import { contactCardTemplate } from "../templates/contact-card.template";
import { Contact } from "../models/contact.model";
import Swal from "sweetalert2";
import { IContact } from "../interfaces/contact.interface";

type deleteCallback = (id: string) => void;
type editCallback = (contact: IContact) => void;

export class ContactCardsView {
    private cards: HTMLElement = document.querySelector("#cards")!;

    constructor() {}

    public renderCards = (people: Contact[]): void => {
        this.cards.innerHTML = "";
        for (const contact of people) {
            this.renderCard(contact);
        }
    };

    public renderCard = (contact: IContact): HTMLElement => {
        const card = new DOMParser().parseFromString(contactCardTemplate(contact), "text/html").body.firstChild as HTMLElement;
        card.classList.add("animate__animated", "animate__jackInTheBox", "animate__faster");
        card.addEventListener("animationend", () => card.classList.remove("animate__animated", "animate__jackInTheBox", "animate__faster"));
        this.cards.appendChild(card);
        return card;
    };

    public updateCard = (contact: IContact): void => {
        const card: HTMLElement = document.querySelector(`.card[data-id="${contact.id}"]`)!;
        const newCard = new DOMParser().parseFromString(contactCardTemplate(contact), "text/html").body.firstChild as HTMLElement;
        newCard.classList.add("animate__animated", "animate__pulse", "animate__faster");
        newCard.addEventListener("animationend", () => newCard.classList.remove("animate__animated", "animate__pulse", "animate__faster"));
        this.cards.replaceChild(newCard, card);
    };

    public deleteCard = (id: string): void => {
        const card: HTMLElement = document.querySelector(`.card[data-id="${id}"]`)!;
        card.classList.add("animate__animated", "animate__hinge");
        card.addEventListener("animationend", () => card.remove());
    };

    public bindDeleteButton = (id: string, callback: deleteCallback): void => {
        const deleteButton: HTMLElement = document.querySelector(`.deleteButton[data-id="${id}"]`)!;
        deleteButton.addEventListener("click", () => this.deleteSwal(callback, id));
    };

    public bindDeleteButtons = (callback: deleteCallback): void => {
        const deleteButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".deleteButton");
        for (const button of deleteButtons) {
            button.addEventListener("click", () => this.deleteSwal(callback, button.dataset.id));
        };
    };

    public bindEditButton = (id: string, callback: editCallback): void => {
        const editButton: HTMLElement = document.querySelector(`.editButton[data-id="${id}"]`)!;
        editButton.addEventListener("click", () => {
            callback(JSON.parse(editButton.dataset.contact));
        });
    };

    public bindEditButtons = (callback: editCallback): void => {
        const editButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".editButton");
        for (const button of editButtons) {
            button.addEventListener("click", () => {
                callback(JSON.parse(button.dataset.contact));
            });
        };
    };

    private deleteSwal = (callback: deleteCallback, id: string): void => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                callback(id);
                Swal.fire(
                    "Deleted!",
                    "Your file has been deleted.",
                    "success"
                );
            }
        });
    };
}
