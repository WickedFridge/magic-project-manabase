const redis = require(`redis`);
const { promisify } = require('util');

function getCacheClient() {
    let client = redis.createClient();
    const getAsync = promisify(client.get).bind(client);

    return {
        async get(key) {
            return getAsync(key);
        },
        set(key, value) {
            client.set(key, value);
            return this;
        },
        delete(key) {
            client.del(key);
            return this;
        },
        flush() {
            client.flushdb();
            return this;
        },
    };
}

module.exports = { getCacheClient };
