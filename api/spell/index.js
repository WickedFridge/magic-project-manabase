const config = require('config');
const bodyParser = require('body-parser');
const express = require('express');
const { getCache } = require('../decklist/cards/utils');
const { cachedCanPlaySpellOnCurve } = require('../decklist/cards/utils');
const { customLogger } = require('../common/logger');

const logger = customLogger('index');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/spell/can-play', async (req, res) => {
    const { lands, spell } = req.body;
    try {
        logger.info('called');
        const canPlay = await cachedCanPlaySpellOnCurve(lands, spell);
        logger.info(canPlay);
        return res.json(canPlay);
    } catch (e) {
        logger.error(e);
        return res.status(500).json(e.message);
    }
});

app.get('/spell/cache', async (req, res) => {
    const cache = Array.from(getCache()).map(([key, value]) => [...JSON.parse(key), value]);
    res.json(cache);
});

app.listen(config.port, () => {
    logger.info(`Starting "${config.name}" listening on port ${config.port}`);
});
