module.exports = {
    apiClients: {
        scryfall: {
            baseURL: 'https://api.scryfall.com',
            cacheClientConfig: {
                type: 'redis',
                // defaultTtl: null,
            },
        },
        spell: {
            baseURL: 'http://localhost:3001/spell',
        }
    },
    name: 'server',
    port: 3000,
};
