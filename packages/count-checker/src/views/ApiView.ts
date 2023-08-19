import { AbstractView } from './AbstractView';
import { Datastore } from '@google-cloud/datastore';
import { ApiViewController } from '../controllers/ApiViewController';

export class ApiView extends AbstractView {
    private controller: ApiViewController;

    constructor(private datastore: Datastore) {
        super();
        this.controller = new ApiViewController(datastore);
    }

    protected initRouter(): void {
        this.router.get('/entities', async (req, res) => {
            const result = await this.controller.getEntities();
            res.json(result);
        });
    }
}
