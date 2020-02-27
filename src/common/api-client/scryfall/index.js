const AbstractApiClient = require(`../abstract`);

/**
 * NLU API client
 */
class ScryfallApiClient extends AbstractApiClient {
    constructor({ baseURL }) {
        super({
            baseURL,
            baseHeaders: {
                'Content-Type': `application/json; charset=utf-8`,
            },
        });
    }

    async getCardByName(cardName) {
        const results = await this._timeTrackedAxiosCall({
            method: `get`,
            url: `/cards/search?q=!"${cardName}"`,
            timeTrackerLabel: `scryfall`,
        });
        if (results.status) {
            this.logger.error('error !');
            throw new Error('error catched', results.status);
        }
        const { id, name, mana_cost, cmc, colors, type_line } = results.data[0];
        return { id, name, mana_cost, cmc, colors, type_line };
    }
}

module.exports = ScryfallApiClient;
