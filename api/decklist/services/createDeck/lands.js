const { getArrayOfCards } = require('../../cards/utils');
const { customLogger } = require('../../../common/logger');

const logger = customLogger('lands');

function handleFetchlands(lands) {
    const fetchs = new Set(lands.filter(land => land.fetchland));
    fetchs.forEach(fetch => {
        logger.info(`fetch : ${fetch.name}`);
        const landTypes = ['Basic', 'Plains', 'Island', 'Swamp', 'Forest', 'Mountain'];
        const targets = fetch.fetchland.filter(prop => landTypes.includes(prop));
        const colors = [];
        lands.forEach(land => {
            if (targets.some(t => land.type.includes(t))) {
                colors.push(...land.colors);
            }
        });
        fetch.colors.push(...new Set(colors));
    })
}

function handleNotManaProducingLands(lands) {
    lands.forEach(land => {
        land.producesMana = land.colors.length > 0;
    })
}

function handlePathway(card, cardsCount) {
    const colors = [...new Set(card.card_faces
        .reduce((acc, splitcard) => [...acc, ...splitcard.colors], []))];
    const text = card.card_faces.reduce((acc, splitcard) => `${acc} ${splitcard.text}`, '');
    card.colors = colors;
    card.text = text;
    return getArrayOfCards(cardsCount, card, card.name);
}

module.exports = {
    handleFetchlands,
    handleNotManaProducingLands,
    handlePathway,
};