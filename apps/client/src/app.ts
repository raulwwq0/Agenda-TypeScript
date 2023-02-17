import "../../../node_modules/reset-css/reset.css";
import { AgendaService } from "./services/agenda.service";
import { ContactCardsView } from "./views/contact-cards.view";
import { AgendaController } from "./controllers/agenda.controller";
import { FormsView } from "./views/forms.view";
import { HttpService } from "./commons/http.service";
import { StorageService } from "./commons/storage.service";
import { AgendaRepository } from "./repositories/agenda.repository";
import { AgendaEntity } from "./entities/agenda.entity";
import { IContact } from "./interfaces/contact.interface";

const httpService = new HttpService<IContact>();
const localStorageService = new StorageService(localStorage);
const repositoryService = new AgendaRepository<IContact>(new AgendaEntity("contacts"), "contacts");
const agendaService = new AgendaService(httpService, localStorageService, repositoryService);
const contactCardsView = new ContactCardsView();
const formsView = new FormsView();

const agendaController = new AgendaController(agendaService, contactCardsView, formsView);
