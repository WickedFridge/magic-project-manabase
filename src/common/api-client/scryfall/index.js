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

    getCardByName(name) {
        return this._timeTrackedAxiosCall({
            method: `get`,
            url: `/cards/search`,
            q: `!"${name}"`,
            timeTrackerLabel: `scryfall`,
        });
    }
}

module.exports = ScryfallApiClient;
