const { handleNotManaProducingLands, handleFetchlands } = require('./lands');
const { fetchCardInfo } = require('./fetch');

async function createDeck(decklist, xValue) {
    const [deckCardsCount, deckSpells, lands] = await fetchCardInfo(decklist.deck, xValue);
    const [sideCardsCount, sideSpells, sideLands] = await fetchCardInfo(decklist.sideboard, xValue);
    const [commanderCardsCount, commander] = await fetchCardInfo(decklist.commander, xValue);

    const spells = [...deckSpells, ...sideSpells, ...commander];

    const cardCounts = {
        deck: deckCardsCount,
        sideboard: sideCardsCount,
        commander: commanderCardsCount,
    };

    handleFetchlands(lands);
    handleNotManaProducingLands(lands);
    const deckSize = Object.values(cardCounts.deck).reduce((acc, cur) => acc + cur);
    return [lands, spells, deckSize, cardCounts];
}

module.exports = {
    createDeck,
};
