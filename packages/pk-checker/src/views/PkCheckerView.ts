import { AbstractView } from './AbstractView';
import { Datastore } from '@google-cloud/datastore';
import { PkCheckerController } from '../controllers/PkCheckerController';

export class PkCheckerView extends AbstractView {
    private controller: PkCheckerController;

    constructor(datastore: Datastore) {
        super();
        this.controller = new PkCheckerController(datastore);
    }

    protected initRouter(): void {
        this.router.post('/pk/check', async (req, res) => {
            try {
                await this.controller.process();
                res.status(200).json({ message: "ok" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: error.message });
            }
        });
    }
}
