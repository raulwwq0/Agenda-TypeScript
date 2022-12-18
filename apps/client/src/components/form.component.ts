export class Form {
    constructor() {}

    public render = (): HTMLFormElement => {
        const form = document.createElement("form");
        form.innerHTML = `
        <input type="text" placeholder="Name" id="name"/>
        <input type="text" placeholder="Surname" id="surname"/>
        <input type="text" placeholder="Birthdate" id="birthdate">
        <input type="text" placeholder="Phones (Splitted by commas)" id="phones"/>
        <input type="text" placeholder="Image" id="image" />
        <span class="button insert-button" id="insertButton">Insert</span>
        <div class="update-buttons-wrapper hidden" id="updateButtonsWrapper">
            <span class="button update-button" id="updateButton">Update</span>
            <span class="button cancel-button" id="cancelButton"><i class="fa-solid fa-x"></i></span>
        </div>
        `;
        return form;
    }
}