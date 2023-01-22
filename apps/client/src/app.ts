import "../../../node_modules/reset-css/reset.css";
import { PeopleService } from "./services/people.service";
import { PeopleCardsView } from "./views/people-cards.view";
import { AgendaController } from "./controllers/agenda.controller";
import { FormsView } from "./views/forms.view";
import { HttpService } from "./services/http.service";

const httpService = new HttpService();
const peopleService = new PeopleService(httpService);
const peopleCardsView = new PeopleCardsView();
const formsView = new FormsView();

new AgendaController(peopleService, peopleCardsView, formsView);
