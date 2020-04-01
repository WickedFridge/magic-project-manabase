const SpellApiClient = require(`.`);
const SpellApiClientMock = require(`./mock`);

const clients = {};

function createClient(config) {
    const key = JSON.stringify(config);
    if (!clients[key]) {
        clients[key] = config.mock === true
            ? new SpellApiClientMock(config)
            : new SpellApiClient(config);
    }
    return clients[key];
}

module.exports = { createClient };
