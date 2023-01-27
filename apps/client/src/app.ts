import "../../../node_modules/reset-css/reset.css";
import { AgendaService } from "./services/agenda.service";
import { PeopleCardsView } from "./views/people-cards.view";
import { AgendaController } from "./controllers/agenda.controller";
import { FormsView } from "./views/forms.view";
import { HttpService } from "./commons/http.service";
import { StorageService } from "./commons/storage.service";

const httpService = new HttpService();
const localStorageService = new StorageService(localStorage);
const peopleService = new AgendaService(httpService, localStorageService);
const peopleCardsView = new PeopleCardsView();
const formsView = new FormsView();

new AgendaController(peopleService, peopleCardsView, formsView);
