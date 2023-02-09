import express from 'express';
import dotenv from 'dotenv';
import { AgendaRouter } from './routers/agenda.router';
import { AgendaController } from './controllers/agenda.controller';
import { MongoService } from './mongodb/services/mongo.service';
import { MongoEntity } from './mongodb/entities/mongo.entity';
import IContact from './interfaces/contact.interface';
import Contact from './mongodb/models/contact.model';
import { AgendaService } from './services/agenda.service';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at \x1b[35mhttp://localhost:${port}\x1b[0m`);
});

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoEntity = new MongoEntity();
const mongoService = new MongoService<IContact>(mongoEntity, Contact);
const agendaService = new AgendaService(mongoService);
const agendaController = new AgendaController(agendaService);
const agendaRouter = new AgendaRouter(agendaController);

app.use('/', agendaRouter.router);
app.use('/contacts', agendaRouter.router);

