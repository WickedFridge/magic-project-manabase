const { getManaCost } = require("../../../decklist/cards/utils");
const AbstractApiClient = require(`../abstract`);

/**
 * Scryfall API client
 */
class ScryfallApiClient extends AbstractApiClient {
    constructor({ baseURL, cacheClientConfig }) {
        super({
            baseURL,
            cacheClientConfig,
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
        const { id, name, mana_cost, cmc, colors, color_identity, type_line, oracle_text } = results.data[0];
        if (RegExp('Land').test(type_line) && colors.length === 0) {
            colors.push(...color_identity);
        }
        return { id, name, cmc, colors, type: type_line, text: oracle_text, cost: getManaCost(mana_cost), mana_cost };
    }
}

module.exports = ScryfallApiClient;
