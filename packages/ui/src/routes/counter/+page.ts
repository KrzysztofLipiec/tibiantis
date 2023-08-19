import config from '../../config';

export async function load({ params }) {
    const entities: Array<{ amount: number, time: string }> = await (await fetch(
        config.apiUrl + '/entities', {
            method: 'GET',
        })).json();

    return {
        entities: entities.reverse(),
    }
}
