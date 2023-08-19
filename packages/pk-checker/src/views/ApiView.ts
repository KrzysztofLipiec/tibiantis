import { AbstractView } from './AbstractView';
import { Datastore } from '@google-cloud/datastore';
import { ApiController } from '../controllers/ApiController';

export class ApiView extends AbstractView {
    private controller: ApiController;

    constructor(private datastore: Datastore) {
        super();
        this.controller = new ApiController(datastore);
    }

    initRouter() {
        this.router.post('/pk/list', async (req, res) => {
            try {
                await this.controller.updatePkList(req.body);
                res.status(200).json({ message: "ok" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: error.message });
            }
        });
    }
}
