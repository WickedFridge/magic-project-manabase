module.exports = {
    apiClients: {
        scryfall: {
            baseURL: 'https://api.scryfall.com',
            cacheClientConfig: {
                type: 'memory',
                defaultTtl: null,
            },
        },
    },
    name: 'server',
    port: 3000,
};
