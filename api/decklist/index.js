const config = require('config');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { customLogger } = require('../common/logger');
const { analyzeDecklist } = require('./services/analyzeDecklist');
const { getCache } = require('./cards/utils');

const logger = customLogger('index');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/analyze', async (req, res) => {
    const { decklist, xValue } = req.body;
    try {
        const result = await analyzeDecklist(decklist, xValue);
        return res.json(result);
    } catch (e) {
        logger.error(e);
        return res.status(e.code || 500).send({ error: e.message });
    }
});

app.get('/cache', async (req, res) => {
    const cache = Array.from(getCache()).map(([key, value]) => [...JSON.parse(key), value]);
    res.json(cache);
});

module.exports = app;
