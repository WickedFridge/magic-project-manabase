const ScryfallApiClient = require(`.`);
const ScryfallApiClientMock = require(`./mock`);

const clients = {};

function createClient(config) {
    const key = JSON.stringify(config);
    if (!clients[key]) {
        clients[key] = config.mock === true
            ? new ScryfallApiClientMock(config)
            : new ScryfallApiClient(config);
    }
    return clients[key];
}

module.exports = { createClient };
