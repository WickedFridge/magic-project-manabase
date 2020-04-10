const { getManaCost } = require("../../../decklist/cards/utils");
const AbstractApiClient = require(`../abstract`);
const NotFoundError = require('../../errors/NotFoundError');

function handleSplitCard(card) {
    const cost = getManaCost(card.mana_cost);
    return {
        name: card.name,
        cmc: Object.values(cost).reduce((acc, cur) => acc + cur, 0),
        colors: card.colors,
        type: card.type_line,
        text: card.oracle_text,
        cost,
        mana_cost: card.mana_cost,
    };
}

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
            const { name, mana_cost, cmc, colors, color_identity, type_line, oracle_text } = results.data[0];
            let { card_faces } = results.data[0];

            if(card_faces) {
                card_faces = card_faces.map(handleSplitCard);
            } else if (RegExp('Land').test(type_line) && colors.length === 0) {
                colors.push(...color_identity);
            }
            const cost = card_faces ? {} : getManaCost(mana_cost);
            return { name, cmc, colors, type: type_line, text: oracle_text, cost, mana_cost, card_faces };
        } catch (e) {
            console.log(e);
            if (e.response && e.response.status === 404) {
                throw new NotFoundError(`Can't find card ${cardName}`);
            }
            throw e;
        }
    }
}

module.exports = ScryfallApiClient;
