import express from 'express';
import dotenv from 'dotenv';
import { AgendaRouter } from './routes/agenda.routes';
import { AgendaController } from './controllers/agenda.controller';
import { MongoService } from './services/mongo.service';
import { MongoEntity } from './mongodb/entities/mongo.entity';
import IContact from './interfaces/contact.interface';
import Contact from './mongodb/models/contact.model';

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
const agendaController = new AgendaController(mongoService);
const agendaRouter = new AgendaRouter(agendaController);

app.use('/', agendaRouter.router);
app.use('/contacts', agendaRouter.router);

