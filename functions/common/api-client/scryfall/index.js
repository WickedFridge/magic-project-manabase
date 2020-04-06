const { getManaCost } = require("../../../decklist/cards/utils");
const AbstractApiClient = require(`../abstract`);
const NotFoundError = require('../../errors/NotFoundError');

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
        try {
            const results = await this._timeTrackedAxiosCall({
                method: `get`,
                url: `/cards/search?q=!"${cardName}"`,
                timeTrackerLabel: `scryfall`,
            });
            const { id, name, mana_cost, cmc, colors, color_identity, type_line, oracle_text, card_faces } = results.data[0];
            if (RegExp('Land').test(type_line) && colors.length === 0) {
                colors.push(...color_identity);
            }
            // Dual cards handling
            if(card_faces) {
                card_faces.forEach(card => {
                    card.cost = getManaCost(card.mana_cost);
                    card.cmc = Object.values(card.cost).reduce((acc, cur) => acc + cur);
                })
            }
            const cost = card_faces ? {} : getManaCost(mana_cost);
            return { id, name, cmc, colors, type: type_line, text: oracle_text, cost, mana_cost, card_faces };
        } catch (e) {
            if (e.response.status === 404) {
                throw new NotFoundError(`Can't find card ${cardName}`);
            }
            throw e;
        }
    }
}

module.exports = ScryfallApiClient;
