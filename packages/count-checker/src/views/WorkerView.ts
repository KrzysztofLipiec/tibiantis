import { AbstractView } from './AbstractView';
import { WorkerController } from '../controllers/WorkerController';
import { Datastore } from '@google-cloud/datastore';

export class WorkerView extends AbstractView {
    private controller: WorkerController;

    constructor(datastore: Datastore) {
        super();
        this.controller = new WorkerController(datastore);
    }

    protected initRouter(): void {
        this.router.post('/worker', async (req, res) => {
            try {
                await this.controller.savePlayersOnline();
                res.status(200).json({ message: "ok" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: error.message });
            }
        });
    }
}
