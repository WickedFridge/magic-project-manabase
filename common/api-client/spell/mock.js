/* eslint-disable class-methods-use-this */
const SpellApiClient = require(`.`);

/**
 * Scryfall API client mock
 */
class SpellApiClientMock extends SpellApiClient {
    async postCanPlay(lands, spell) {
        if (this.forceError) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }
}

module.exports = SpellApiClientMock;
