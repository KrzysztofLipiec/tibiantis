import { Datastore } from '@google-cloud/datastore';

export class ApiViewController {
    constructor(private datastore: Datastore) {

    }

    async getEntities() {
        const query = this.datastore.createQuery('LoggedInData').order('time', { descending: true }).limit(1000);
        const [data] = await this.datastore.runQuery(query);
        return data;
    }
}
