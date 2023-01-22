import { IPerson } from "../interfaces/person.interface";
import { FormInputs } from "../types/form-inputs.type";
import { formTemplate } from "../templates/form.template";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { ServiceTemporarilyUnavailableException } from "../exceptions/service-temporarily-unavailable.exception";
import { NonValidInputException } from "../exceptions/non-valid-input.exception";

type insertCallback = (formInputs: FormInputs) => void;
type updateCallback = (id:string, formInputs: FormInputs) => void

export class FormsView {

    private aside: HTMLElement = document.querySelector("aside")!;
    private formInputs: FormInputs;
    private insertButton: HTMLElement;
    private updateButtonsWrapper: HTMLElement;
    private updateButton: HTMLElement;
    private cancelButton: HTMLElement;

    constructor() {}

    public render = (): void => {
        this.aside.innerHTML += formTemplate;
        this.aside.classList.remove("hidden");
        this.aside.classList.add("visible", "animate__animated", "animate__slideInRight");
        this.formInputs = {
            img: this.aside.querySelector("#image")!,
            name: this.aside.querySelector("#name")!,
            surname: this.aside.querySelector("#surname")!,
            birthdate: this.aside.querySelector("#birthdate")!,
            phones: this.aside.querySelector("#phones")!,
        }
        this.insertButton = this.aside.querySelector("#insertButton")!;
        this.updateButtonsWrapper = this.aside.querySelector("#updateButtonsWrapper")!;
        this.updateButton = this.aside.querySelector("#updateButton")!;
        this.cancelButton = this.aside.querySelector("#cancelButton")!;
        this.cancelButtonEvent();
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

    public showErrors = (error: Error): void => {
        console.error(error);
        const messageConfig: SweetAlertOptions = {
            icon: "error",
            title: "Oops...",
            html: "Something went wrong!",
            confirmButtonText: "OK",
        };
        const actionsAfterError = {
            reload: () => {
                window.location.reload();
            },
            toExec: () => {},
        }
        switch (error.constructor) {
            case ServiceTemporarilyUnavailableException:
                messageConfig.title = "503 - Service Temporarily Unavailable"
                messageConfig.html = error.message;
                messageConfig.confirmButtonText = "Try again";
                actionsAfterError.toExec = actionsAfterError.reload;
                break;
            case NonValidInputException:
                messageConfig.title = "400 - Invalid Input Field";
                messageConfig.html = `${error.message}`;
                break;
        }

        Swal.fire(messageConfig)
            .then((result) => {
                if (result.isConfirmed) {
                    actionsAfterError.toExec();
                };
            });
    }
}