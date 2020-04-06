const clients = {};

function createClient(config) {
    const key = JSON.stringify(config);
    if (!clients[key]) {
        // eslint-disable-next-line global-require
        clients[key] = require(`./${config.type}`).getCacheClient(config);
    }
    return clients[key];
}

module.exports = { createClient };
