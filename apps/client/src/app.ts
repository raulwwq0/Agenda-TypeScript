import "../../../node_modules/reset-css/reset.css";
import { AgendaService } from "./services/agenda.service";
import { ContactCardsView } from "./views/contact-cards.view";
import { AgendaController } from "./controllers/agenda.controller";
import { FormsView } from "./views/forms.view";
import { HttpService } from "./commons/http.service";
import { StorageService } from "./commons/storage.service";
import { RepositoryService } from "./commons/repository.service";
import { Agenda } from "./models/database.model";

const httpService = new HttpService();
const localStorageService = new StorageService(localStorage);
const repositoryService = new RepositoryService(new Agenda(), "contacts");
const agendaService = new AgendaService(httpService, localStorageService, repositoryService);
const contactCardsView = new ContactCardsView();
const formsView = new FormsView();

new AgendaController(agendaService, contactCardsView, formsView);
