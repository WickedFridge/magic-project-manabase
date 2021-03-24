import { createSelector } from 'reselect';

export const decklistStringSelector = (state) => state.input.decklist;
export const xValueSelector = (state) => state.input.xValue;
export const loadingSelector = (state) => state.input.loading;

const decklistFormatter = (decklistInput) => {
    const decklist = {
        companion: [],
        commander: [],
        deck: [],
        sideboard: [],
    };

    const cleanDeck = decklistInput.split('\n').filter((e) => !!e);
    let currentCategory = 'deck';
    cleanDeck.forEach((row) => {
        if (['Sideboard', 'Deck', 'Companion', 'Commander'].includes(row)) {
            currentCategory = row.toLowerCase();
        } else {
            decklist[currentCategory].push(row.split(' (')[0]);
        }
    });

    return decklist;
};

export const decklistSelector = createSelector(decklistStringSelector, decklistFormatter);
