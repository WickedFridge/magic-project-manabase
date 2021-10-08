const { performance } = require(`perf_hooks`);
const { customLogger } = require(`../logger`);

const logger = customLogger(`timeTracker`);

const _timeTracker = {};

/**
 * Store request time for an requestType and calc stats and percentile for one or all requestType
 *
 * requestType supported:
 *  - any axios call
 *
 * Response returned can be: {
 *   requestType: 'scryFall',    // RequestType
 *   sampleSize: 1000,              // Number of last request processed (0 to 1000)
 *   min: 171,                      // Lower value from sample
 *   max: 10450,                    // Upper value from sample
 *   p90: 6700,                     // 90th percentile from sample
 *   P95: 7860,                     // 95th percentile from sample
 *   p99: 9067,                     // 99th percentile from sample
 * }
 *
 * If no value added (botcore just (re(start)) then value can be null
 */
const timeTracker = {
    /**
     * Generate new Timestamp
     *
     * @returns Integer
     */
    getTimestamp() {
        return performance.now();
    },

    /**
     * Add request time for one requestType
     *
     * @param requestStartedAt Integer
     * @param requestType String
     */
    add(requestStartedAt, requestType = `unknown`) {
        if (!_timeTracker[requestType]) {
            _timeTracker[requestType] = [];
        }
        const duration = this.getTimestamp() - requestStartedAt;
        logger.debug(`### Request time for ${requestType}: ${duration} ms.`);
        _timeTracker[requestType].push(duration);
        // Keep last 1000 requests
        while (_timeTracker[requestType].length > 1000) {
            _timeTracker[requestType].shift();
        }
    },

    /**
     * Retrieve stats and percentile for one requestType
     *
     * @param requestType String
     * @returns Object
     */
    getPercentiles(requestType) {
        if (!_timeTracker[requestType]) {
            logger.warn(`TimeTracker: RequestType does not exists: ${requestType}`);
            return null;
        }
        // Create and works on a shallow copy of request time
        const dataset = Array.from(_timeTracker[requestType]);
        const sampleSize = dataset.length;
        dataset.sort((a, b) => a - b);
        const p50 = Math.floor((50 * sampleSize) / 100);
        const p90 = Math.floor((90 * sampleSize) / 100);
        const p95 = Math.floor((95 * sampleSize) / 100);
        const p99 = Math.floor((99 * sampleSize) / 100);
        // Calculate
        const sum = sampleSize ? dataset.reduce((a, b) => a + b) : 0;
        return {
            sampleSize,
            type: requestType,
            min: dataset[0] || null,
            max: dataset[sampleSize - 1] || null,
            average: sampleSize ? sum / dataset.length : null,
            p50: dataset[p50] || null,
            p90: dataset[p90] || null,
            p95: dataset[p95] || null,
            p99: dataset[p99] || null,
        };
    },

    /**
     * Retrieve all stats and percentile for each requestType
     *
     * @returns Object
     */
    getAllPercentiles() {
        const result = {};
        for (const requestType in _timeTracker) {
            result[requestType] = this.getPercentiles(requestType);
        }
        return result;
    },
};

module.exports = {
    timeTracker,
};
