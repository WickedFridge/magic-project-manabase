const { getManaCost } = require("../../../decklist/cards/utils");
const AbstractApiClient = require(`../abstract`);
const NotFoundError = require('../../errors/NotFoundError');

function handleSplitCard(card) {
    const cost = getManaCost(card.mana_cost);
    return {
        name: card.name,
        cmc: Object.values(cost).reduce((acc, cur) => acc + cur, 0),
        colors: card.colors,
        type: card.type_line.split(' '),
        text: card.oracle_text,
        cost,
        mana_cost: card.mana_cost,
    };
}

function handleAlternateCost(data, capacity, alternateCost) {
    const { name, mana_cost, colors, color_identity, type_line, oracle_text } = data;
    return [{
        name,
        mana_cost,
        colors,
        color_identity,
        type_line,
        oracle_text,
    }, {
        name: `${name} (${capacity})`,
        mana_cost: alternateCost,
        colors,
        color_identity,
        type_line,
        oracle_text,
    }];
}

function handleLandCard(colors, color_identity, oracle_text) {
    colors.push(...color_identity);
    if (oracle_text.match(/\{T}: Add \{C}/)) {
        colors.push('C');
    }
    if (oracle_text.match(/\{T}(:?,.+)?: Add one mana of any color/)) {
        colors.push('W', 'U', 'B', 'R', 'G');
    }
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
                cacheKey: cardName,
            });
            const { name, mana_cost, cmc, colors, color_identity, type_line, oracle_text } = results.data[0];
            let { card_faces } = results.data[0];
            if (oracle_text) {
                const escape = oracle_text.match(/(?:Escape—)((\{\w})+)/);
                const alternateCost = oracle_text.match(/(\w+) ((\{\w})+) (?:\()/);
                if (escape) {
                    card_faces = handleAlternateCost(results.data[0],'Escape', escape[1]);
                }
                if (alternateCost) {
                    card_faces = handleAlternateCost(results.data[0], alternateCost[1], alternateCost[2]);
                }
            }
            if(card_faces) {
                card_faces = card_faces.map(handleSplitCard);
            } else if (RegExp('Land').test(type_line) && colors.length === 0) {
                handleLandCard(colors, color_identity, oracle_text);
            }
            const cost = card_faces ? {} : getManaCost(mana_cost);
            return { name, cmc, colors, type: type_line.split(' '), text: oracle_text, cost, mana_cost, card_faces };
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
