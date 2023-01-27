import "../../../node_modules/reset-css/reset.css";
import { AgendaService } from "./services/agenda.service";
import { ContactCardsView } from "./views/contact-cards.view";
import { AgendaController } from "./controllers/agenda.controller";
import { FormsView } from "./views/forms.view";
import { HttpService } from "./commons/http.service";
import { StorageService } from "./commons/storage.service";

const httpService = new HttpService();
const localStorageService = new StorageService(localStorage);
const agendaService = new AgendaService(httpService, localStorageService);
const contactCardsView = new ContactCardsView();
const formsView = new FormsView();

new AgendaController(agendaService, contactCardsView, formsView);
