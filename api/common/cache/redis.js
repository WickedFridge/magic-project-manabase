const redis = require(`redis`);
const { promisify } = require('util');

function getCacheClient() {
    let client = redis.createClient({
        port: 13467,
        host: 'redis-13467.c124.us-central1-1.gce.cloud.redislabs.com',
        password: 'project-manabase-redis',
    });
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
