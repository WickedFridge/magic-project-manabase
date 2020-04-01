const config = require('config');
const bodyParser = require('body-parser');
const express = require('express');
const { analyzeDecklist } = require('./services/analyzeDecklist');
const { getCache } = require('./cards/utils');
const { customLogger } = require('../common/logger');

const logger = customLogger('index');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/analyze', async (req, res) => {
    const decklist = req.body.deck;
    try {
        const result = await analyzeDecklist(decklist);
        return res.json(result);
    } catch (e) {
        logger.error(e);
        return res.status(500).json(e.message);
    }
});

app.get('/cache', async (req, res) => {
    const cache = Array.from(getCache()).map(([key, value]) => [...JSON.parse(key), value]);
    res.json(cache);
});

// app.listen(config.port, () => {
//     logger.info(`Starting "${config.name}" listening on port ${config.port}`);
// });

module.exports = app;
