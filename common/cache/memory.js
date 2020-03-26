const crypto = require(`crypto`);

function getCacheClient({ ttl: defaultTtl } = {}) {
    let cache = {};
    return {
        generateCacheKey(key) {
            const cacheKey = JSON.stringify(key);
            return crypto.createHash(`md5`).update(cacheKey).digest(`hex`);
        },
        get(key) {
            return cache[key];
        },
        set(key, value, ttl) {
            cache[key] = value;
            const finalTtl = typeof ttl === `number` ? ttl : defaultTtl;
            if (typeof finalTtl === `number` && finalTtl > 0) {
                setTimeout(() => { this.delete(key); }, finalTtl);
            }
            return this;
        },
        delete(key) {
            delete cache[key];
            return this;
        },
        flush() {
            cache = {};
            return this;
        },
    };
}

module.exports = { getCacheClient };
