function getCacheClient({ ttl: defaultTtl } = {}) {
    let cache = {};
    return {
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
