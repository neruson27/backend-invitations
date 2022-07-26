import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from "morgan";

import mongo from './clients/mongodb';
import routes from './routes';
import authorization from './middleware/authorization';

dotenv.config();

const app = express();

mongo.connect();

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(authorization);

app.use(morgan('dev'));

app.use('/guest', routes.guest);
app.use('/admin', routes.admin);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));

export default app;