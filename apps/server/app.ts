import express from 'express';
import dotenv from 'dotenv';
import contactRouter from './routes/contact.routes';
import MongoEntity from './mongodb/entities/mongo.entity';

dotenv.config();
MongoEntity.connect();

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

app.use('/', contactRouter);
app.use('/contacts', contactRouter);

