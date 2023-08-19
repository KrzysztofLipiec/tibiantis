import { Datastore } from '@google-cloud/datastore';
import { PkCheckerService } from '../services/PkCheckerService';

export class PkCheckerController {
    private service: PkCheckerService;

    constructor(private datastore: Datastore) {
        this.service = new PkCheckerService(datastore);
    }

    async process() {
        const onlineList = await this.service.getOnlineList();
        const pkList = await this.service.getPkList();
        const difference = await this.service.updatePkList(onlineList, pkList);
        difference.forEach((entry) => {
            this.service.notify(entry);
        });
    }
}
