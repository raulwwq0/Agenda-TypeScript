import express from 'express';
import dotenv from 'dotenv';
import contactRouter from './routes/contact.routes';
import Connection from './connection';

dotenv.config();
Connection.connect();

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', contactRouter);
app.use('/contacts', contactRouter);

