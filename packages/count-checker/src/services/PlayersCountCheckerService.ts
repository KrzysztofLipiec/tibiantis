import fetch from 'node-fetch';
import { Datastore, Entity } from '@google-cloud/datastore';
import { LoggedInData } from '../LoggedInData';

export class PlayersCountCheckerService {
    private static countDataUrl = 'https://tibiantis.online/';

    constructor(private datastore: Datastore) {

    }

    public async process(): Promise<void> {
        const count = await this.fetchCountData();
        const date = new Date();

        console.log("Inserting a new user into the database...")
        const onlineData = new LoggedInData();
        onlineData.time = date;
        onlineData.amount = count;

        const entity: Entity = {
            key: this.datastore.key(['LoggedInData']),
            data: onlineData,
        }
        try {
            await new Promise((resolve) => this.datastore.insert(entity, (response) => resolve(response)));
        } catch (error) {
            console.log(error);
            throw new Error('Failed to insert data into datastore');
        }
    }

    public async fetchCountData(): Promise<number> {
        try {
            const response = await fetch(PlayersCountCheckerService.countDataUrl);
            const pageContent = await response.text();
            return parseInt(pageContent.match(/<div>Players Online<\/div><strong>([0-9]*)<\/strong>/)[1])
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch count data');
        }
    }
}
