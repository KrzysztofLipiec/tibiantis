import * as express from 'express';
import * as cors from 'cors';
import { Datastore } from '@google-cloud/datastore';
import { AbstractView } from './views/AbstractView';
import { WorkerView } from './views/WorkerView';
import { ApiView } from './views/ApiView';


const app = express();
const datastore = new Datastore();


const views: AbstractView[] = [
    new WorkerView(datastore),
    new ApiView(datastore),
];

app.use(cors());

views.forEach((view) => {
    app.use(view.getRouter());
});


export const countChecker: Express.Application = app;
