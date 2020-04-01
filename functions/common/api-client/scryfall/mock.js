/* eslint-disable class-methods-use-this */
const ScryfallApiClient = require(`.`);

/**
 * Scryfall API client mock
 */
class ScryfallApiClientMock extends ScryfallApiClient {
    async getCardByName(cardName) {
        if (this.forceError) {
            return Promise.resolve({
                "object": "error",
                "code": "not_found",
                "status": 404,
                "details": "Your query didn’t match any cards. Adjust your search terms or refer to the syntax guide at https://scryfall.com/docs/reference"
            });
        }
        return Promise.resolve({});
    }
}

module.exports = ScryfallApiClientMock;
