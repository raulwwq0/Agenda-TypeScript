import { IPerson } from "../interfaces/person.interface";
import { FormInputs } from "../types/form-inputs.type";
import { Form } from "../components/form.component";
import Swal from "sweetalert2";

type insertCallback = (formInputs: FormInputs) => void;
type updateCallback = (id:string, formInputs: FormInputs) => void

export class FormsView {

    private aside: HTMLElement = document.querySelector("aside")!;
    private form: HTMLElement;
    private formInputs: FormInputs;
    private insertButton: HTMLElement;
    private updateButtonsWrapper: HTMLElement;
    private updateButton: HTMLElement;
    private cancelButton: HTMLElement;

    private errorIcons;

    constructor() {}

    public render = (): void => {
        const form = new Form().render();
        this.form = form;
        this.formInputs = {
            img: this.form.querySelector("#image")!,
            name: this.form.querySelector("#name")!,
            surname: this.form.querySelector("#surname")!,
            birthdate: this.form.querySelector("#birthdate")!,
            phones: this.form.querySelector("#phones")!,
        }
        this.insertButton = this.form.querySelector("#insertButton")!;
        this.updateButtonsWrapper = this.form.querySelector("#updateButtonsWrapper")!;
        this.updateButton = this.form.querySelector("#updateButton")!;
        this.cancelButton = this.form.querySelector("#cancelButton")!;
        this.cancelButtonEvent();
        this.aside.appendChild(form);
        this.errorIcons = {
            name: document.querySelector("#nameIcon")!,
            surname: document.querySelector("#surnameIcon")!,
            birthdate: document.querySelector("#birthdateIcon")!,
            dni: document.querySelector("#dniIcon")!,
        }
    }

    public clear = (): void => {
        this.formInputs.img.value = "";
        this.formInputs.name.value = "";
        this.formInputs.surname.value = "";
        this.formInputs.birthdate.value = "";
        this.formInputs.phones.value = "";
    }

    public bindInsertButton = (callback: insertCallback): void => {
        this.insertButton.addEventListener("click", () => {
            callback(this.formInputs);
        });
    }

    public insertSuccessful = ({ name, surname }: IPerson): void => {
        this.clear();
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: `${name} ${surname} has been added to the agenda!`,
        });
    }

    public loadPersonDataToUpdate = (person: IPerson): void => {
        this.formInputs.img.value = person.img;
        this.formInputs.name.value = person.name;
        this.formInputs.surname.value = person.surname;
        this.formInputs.birthdate.value = person.birthdate;
        this.formInputs.phones.value = person.phones.join(", ");
        this.updateButton.dataset.id = person.id;
        this.insertButton.classList.add("hidden");
        this.updateButtonsWrapper.classList.remove("hidden");
    }

    public bindUpdateButton = (callback: updateCallback): void => {
        this.updateButton.addEventListener("click", () => {
            callback(this.updateButton.dataset.id, this.formInputs);
        });
    }

    public cancelButtonEvent = (): void => {
        this.cancelButton.addEventListener("click", this.closeUpdateForm);
    }

    public closeUpdateForm = (): void => {
        this.clear();
        this.insertButton.classList.remove("hidden");
        this.updateButtonsWrapper.classList.add("hidden");
    }

    public updateSuccessful = ({ name, surname }: IPerson): void => {
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: `${name} ${surname} has been updated!`,
        });
        this.closeUpdateForm();
    }

    public showErrors = (errorMessage: string): void => {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: errorMessage,
        });
    }
}