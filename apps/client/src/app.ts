import "../../../node_modules/reset-css/reset.css";
import { PeopleService } from "./services/people.service";
import { PeopleCardsView } from "./views/people-cards.view";
import { AgendaController } from "./controllers/agenda.controller";
import { FormsView } from "./views/forms.view";
import { HttpService } from "./services/http.service";
import { StorageService } from "./services/storage.service";

const httpService = new HttpService();
const localStorageService = new StorageService(localStorage);
const peopleService = new PeopleService(httpService, localStorageService);
const peopleCardsView = new PeopleCardsView();
const formsView = new FormsView();

new AgendaController(peopleService, peopleCardsView, formsView);
