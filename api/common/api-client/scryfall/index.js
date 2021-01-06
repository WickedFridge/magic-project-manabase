const { getManaCost, calculateCMC } = require("../../../decklist/cards/utils");
const AbstractApiClient = require(`../abstract`);
const NotFoundError = require('../../errors/NotFoundError');

function getManaProduced(color_identity, oracle_text) {
    const colors = color_identity;
    if (oracle_text.match(/\{T}: Add \{C}/)) {
        colors.push('C');
    }
    if (oracle_text.match(/\{T}(:?,.+)?: Add one mana of any color/)) {
        colors.push('W', 'U', 'B', 'R', 'G');
    }
    return colors;
}

function handleSplitCard(card) {
    const cost = getManaCost(card.mana_cost);
    const cmc = calculateCMC(cost);
    const type = card.type_line.split(' ');
    const colors = type.includes('Land') && card.colors.length === 0 ?
        getManaProduced(card.color_identity, card.oracle_text) :
        card.colors;

    return {
        name: card.name.toLowerCase(),
        cmc,
        colors,
        text: card.oracle_text,
        type,
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
        type_line : 'Ability',
        oracle_text,
    }];
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
                card_faces = card_faces.map(splitcard => handleSplitCard({ ...splitcard, color_identity }));
            } else if (RegExp('Land').test(type_line) && colors.length === 0) {
                colors.push(...getManaProduced(color_identity, oracle_text));
            }
            const cost = card_faces ? {} : getManaCost(mana_cost);
            return { name: name.toLowerCase(), cmc, colors, type: type_line.split(' '), text: oracle_text, cost, mana_cost, card_faces };
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
