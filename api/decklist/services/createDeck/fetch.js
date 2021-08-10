const config = require('config');
const { createClient: createScryfallClient } = require('../../../common/api-client/scryfall/factory');
const { isDFC, isTransformableCard, isPathway, hasTypeLand, markEtbAndLandType } = require('../../cards/utils');
const { customLogger } = require('../../../common/logger');
const { handleXSpell, handleSplitCard } = require('./spells');
const { handlePathway } = require('./lands');

const scryfallApiClient = createScryfallClient(config.apiClients.scryfall);
const logger = customLogger('fetch');

function splitCountAndName(input) {
    const words = input.split(' ');
    const count = words.shift();
    const name = words.join(' ').toLowerCase();
    return [count, name];
}

async function fetchCardInfo(decklist, xValue) {
    const spells = [];
    const lands = [];
    const cardsCount = {};

    (
        await Promise.all(
            decklist.map((cardCountAndName) => {
                const [count, name] = splitCountAndName(cardCountAndName);
                cardsCount[name] = parseInt(count);
                return scryfallApiClient.getCardByName(name);
            }),
        )
    ).forEach((card) => {
        // handle splitcards
        if (isDFC(card)) {
            if (isTransformableCard(card)) {
                card.card_faces.pop();
            }
            if (isPathway(card)) {
                lands.push(...handlePathway(card, cardsCount));
            } else {
                card.card_faces.forEach((splitcard) => {
                    const [addedSpells, addedLands] = handleSplitCard(card, splitcard, xValue, cardsCount);
                    spells.push(...addedSpells);
                    lands.push(...addedLands);
                });
            }
        } else if (!hasTypeLand(card)) {
            // handle regular spells
            handleXSpell(card, xValue);
            spells.push(card);
        } else {
            // handle lands
            const count = cardsCount[card.name];
            const landsToPush = Array(count).fill(markEtbAndLandType(card));
            lands.push(...landsToPush);
        }
    });
    return [cardsCount, spells, lands];
}

module.exports = {
    fetchCardInfo,
};
