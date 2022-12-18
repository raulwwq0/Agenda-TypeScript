import { PersonCard } from "../components/person-card.component";
import { Person } from "../models/person.model";
import Swal from "sweetalert2";
import { IPerson } from "../interfaces/person.interface";

type deleteCallback = (id: string) => void;
type editCallback = (person: IPerson) => void;

export class PeopleCardsView {
    private cards: HTMLElement = document.querySelector("#cards")!;

    constructor() {}

    public renderCards = (people: Person[]): void => {
        this.cards.innerHTML = "";
        for (const person of people) {
            const card = new PersonCard(person).render();
            this.cards.appendChild(card);
        }
    };

    public bindDeleteButtons = (callback: deleteCallback): void => {
        const deleteButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".deleteButton");
        for (const button of deleteButtons) {
            button.addEventListener("click", () => {
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
                        callback(button.dataset.id!);
                        Swal.fire(
                            "Deleted!",
                            "Your file has been deleted.",
                            "success"
                        );
                    }
                });
            });
        };
    };

    public bindEditButtons = (callback: editCallback): void => {
        const editButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".editButton");
        for (const button of editButtons) {
            button.addEventListener("click", () => {
                callback(JSON.parse(button.dataset.person!));
            });
        };
    }
}
