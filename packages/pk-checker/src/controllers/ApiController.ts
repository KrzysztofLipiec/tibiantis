import { Datastore } from '@google-cloud/datastore';

export class ApiController {
    constructor(private datastore: Datastore) {

    }

    public async updatePkList(newList: Array<string>) {
        const query = this.datastore.createQuery('PKList');
        const [list] = await this.datastore.runQuery(query);
        await this.datastore.delete(list.map((entry) => entry[this.datastore.KEY]));
        await this.datastore.insert(
            newList.map(
                (entry) => ({
                    key: this.datastore.key(['PKList']),
                    data: { name: entry, status: 'offline', time: new Date() },
                }),
            ),
        );
    }
}
