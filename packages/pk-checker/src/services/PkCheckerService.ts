import { Datastore } from '@google-cloud/datastore';
import fetch from 'node-fetch';

interface OnlineListEntry {
    name: string
    vocation: string;
    level: number;
}

interface PkListEntry {
    name: string;
    status: 'online' | 'offline';
    time: Date;
}

export class PkCheckerService {
    private static dataUrl = 'https://tibiantis.online/?page=whoisonline';
    private static notifyUrl = 'https://discord.com/api/webhooks/1138885931043139707/WSxhfNBi8n29nY9uc_C96XiNDl2FvZvK9BENuuetUfbfsYqMhd5LNdy7r1kTJGuhz2Cn';

    constructor(private datastore: Datastore) {
    }

    public async getOnlineList(): Promise<OnlineListEntry[]> {
        try {
            const response = await fetch(PkCheckerService.dataUrl);
            const pageContent = await response.text();
            const [listElementsString] = pageContent.match(/\<tr class=\"hover\"\>.*\<\/tr\>/g);
            return listElementsString
                .substring(4, listElementsString.length - 5)
                .split('</tr><tr ')
                .map((l) => l.substring(15, l.length - 1))
                .map((entry) => entry.substring(4, entry.length - 5).split('</td> <td>'))
                .map((rowArray) => {
                    const [nameLinkString, vocation, level] = rowArray;
                    return {
                        name: /<a .*>(.*)\<\/a\>/.exec(nameLinkString)[1],
                        vocation,
                        level: parseInt(level),
                    }
                });
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch count data');
        }
    }

    public async getPkList(): Promise<PkListEntry[]> {
        const query = this.datastore.createQuery('PKList').order('name');
        const [data] = await this.datastore.runQuery(query);
        return data;
    }

    public async updatePkList(onlineList: OnlineListEntry[], pkList: PkListEntry[]): Promise<PkListEntry[]> {
        return Promise.all(
            pkList
                .filter((pkEntry) => {
                    const isOnline = onlineList.find((onlineEntry) => onlineEntry.name === pkEntry.name);
                    const result = (isOnline && pkEntry.status === 'offline') || (!isOnline && pkEntry.status === 'online');
                    if (result) {
                        pkEntry.status = isOnline ? 'online' : 'offline';
                        pkEntry.time = new Date();
                    }
                    return result;
                })
                .map(async (pkEntry) => {
                    await this.datastore.update(pkEntry);
                    return pkEntry;
                }));
    }

    public async notify(entry: PkListEntry) {
        const response = await fetch(PkCheckerService.notifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: `**${entry.name}** is now ${entry.status}`,
            }),
        });
        console.log(response);
    }
}
