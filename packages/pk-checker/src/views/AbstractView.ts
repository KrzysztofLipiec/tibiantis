import * as express from 'express';
import { Router } from 'express';

export abstract class AbstractView {
    protected router: Router = express.Router();

    constructor() {
        this.initRouter();
    }

    public getRouter(): Router {
        return this.router;
    }

    protected abstract initRouter(): void;
}
