import { PlayersCountCheckerService } from '../services/PlayersCountCheckerService';
import { Datastore } from '@google-cloud/datastore';

export class WorkerController {
    constructor(private datastore: Datastore) {
    }

    async savePlayersOnline() {
        return new PlayersCountCheckerService(this.datastore).process();
    }
}
