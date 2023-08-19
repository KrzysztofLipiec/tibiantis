import * as express from 'express';
import * as cors from 'cors';
import { Datastore } from '@google-cloud/datastore';
import { AbstractView } from './views/AbstractView';
import { PkCheckerView } from './views/PkCheckerView';
import { ApiView } from './views/ApiView';


const app = express();
const datastore = new Datastore();


const views: AbstractView[] = [
    new PkCheckerView(datastore),
    new ApiView(datastore),
];

app.use(cors());

views.forEach((view) => {
    app.use(view.getRouter());
});


export const pkChecker: Express.Application = app;
