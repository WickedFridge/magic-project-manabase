/* eslint-disable class-methods-use-this */
const NluApiClient = require(`.`);

/**
 * NLU API client
 */
class ScryfallApiClientMock extends NluApiClient {
    postMessage(data) {
        return Promise.resolve({});
    }
}

module.exports = ScryfallApiClientMock;
