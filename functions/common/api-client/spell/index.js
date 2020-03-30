const AbstractApiClient = require(`../abstract`);

/**
 * Spell API client
 */
class SpellApiClient extends AbstractApiClient {
    constructor({ baseURL, cacheClientConfig }) {
        super({
            baseURL,
            cacheClientConfig,
            baseHeaders: {
                'Content-Type': `application/json; charset=utf-8`,
            },
        });
    }

    async postCanPlay(lands, spell) {
        return this._timeTrackedAxiosCall({
            method: `post`,
            url: `/can-play`,
            timeTrackerLabel: `spell`,
            data: {
                lands,
                spell,
            },
        });
    }
}

module.exports = SpellApiClient;
