const { calculateCMC, hasTypeLand, isMDFC, getArrayOfCards } = require('../../cards/utils');

function handleXSpell(card, xValue) {
    if (!card.cost.X) {
        return;
    }
    card.cost.generic = card.cost.X * xValue;
    delete card.cost.X;
    card.cmc = calculateCMC(card.cost);
}

function handleSplitCard(card, splitcard, xValue, cardsCount) {
    const spells = [];
    const lands = [];
    if (!hasTypeLand(splitcard)) {
        handleXSpell(splitcard, xValue);
        spells.push(splitcard);
        return [spells, lands];
    }
    if (isMDFC(card)) {
        lands.push(...getArrayOfCards(cardsCount, splitcard, card.name));
    }
    return [spells, lands];
}

module.exports = {
    handleSplitCard,
    handleXSpell,
};
