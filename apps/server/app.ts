import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import contactRouter from './routes/contact.routes';
import Connection from './connection';

dotenv.config();
Connection.connect();

const app: Express = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', contactRouter);
app.use('/contacts', contactRouter);

