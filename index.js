import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";

import mongo from './clients/mongodb';
import routes from './routes';
import authorization from './middleware/authorization';

dotenv.config();

const app = express();

mongo.connect();

app.use(bodyParser.json());
app.use(authorization);
app.use('/guest', routes.guest);
app.use('/admin', routes.admin);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));

export default app;