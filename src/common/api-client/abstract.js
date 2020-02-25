const crypto = require(`crypto`);
const axios = require(`axios`);
const { AxiosError, AxiosTimeout } = require(`../errors/AxiosError`);
const { customLogger } = require(`../logger`);
const { timeTracker } = require(`../tools/timeTracker`);
const { createClient: createCacheClient } = require(`../cache/factory`);

const DEFAULT_TIMEOUT = 30000;

/**
 * Log an Axios error with available details about the http call
 * @see https://github.com/axios/axios#handling-errors
 */
function logError(logger, params, error, level = `error`) {
    logger[level]({
        axios: `error`,
        request: {
            body: params.data,
            headers: params.headers,
            params: params.params,
            url: params.baseURL + params.url,
        },
        response: error.response && {
            content: error.response.data,
            status: error.response.status,
        },
        error: {
            message: error.message,
            stack: error.stack,
        },
    });
}

/**
 * Log an Axios request
 */
function logSuccess(logger, params, response, level=`verbose`) {
    logger[level]({
        axios: `success`,
        request: {
            body: params.data,
            headers: params.headers,
            params: params.params,
            url: params.baseURL + params.url,
        },
        response: {
            content: response.data,
            status: response.status,
        },
    });
}

function generateCacheKey(axiosParams) {
    const cacheKeyElements = JSON.stringify([
        axiosParams.method,
        axiosParams.baseUrl,
        axiosParams.url,
        axiosParams.params,
        axiosParams.data,
    ]);
    return crypto.createHash(`md5`).update(cacheKeyElements).digest(`hex`);
}

/**
 * Generic class used to implement API clients
 * Manage base URL, default headers, default timeout and error log
 */
class AbstractApiClient {
    // eslint-disable-next-line complexity
    constructor({ baseURL, baseHeaders, timeout, logger, retryCount, timeTrackerLabel, successLoglevel, cacheClientConfig }) {
        if (new.target === AbstractApiClient) {
            throw new TypeError(`Cannot construct AbstractApiClient instances directly`);
        }
        if (!baseURL) {
            throw new TypeError(`baseURL parameter is mandatory for ${new.target.name}`);
        }
        this.timeTrackerLabel = timeTrackerLabel || new.target.name;
        this.logger = logger || customLogger(new.target.name);
        this.successLoglevel = successLoglevel;
        this.baseURL = baseURL;
        this.baseHeaders = baseHeaders || {};
        this.timeout = timeout || DEFAULT_TIMEOUT;
        this.retryCount = retryCount || 0;
        if (cacheClientConfig) {
            this.cache = createCacheClient(cacheClientConfig);
        }
        this._forceTimeout = false;
        this._forceError = false;
    }

    /**
     * Make an HTTP call with axios
     * This method accepts all axios configuration but adds default values
     * from the API Client instance like baseURL, and timeout
     * Headers are completed by the base headers of the API Client instance
     * @see https://github.com/axios/axios#request-config
     */
    // eslint-disable-next-line max-statements, complexity, max-lines-per-function
    async _axiosCall({ headers = {}, logLevel, errorLevels = {}, cacheTtl, ...axiosParams }) {
        let cacheKey = null;
        if (this.cache) {
            cacheKey = generateCacheKey(axiosParams);
            const cached = this.cache.get(cacheKey);
            if (cached) {
                this.logger.debug(`Cache hit ${cacheKey}`);
                return cached;
            }
            this.logger.debug(`Cache miss ${cacheKey}`);
        }
        // Reject only if the status code is greater than or equal to 400
        const params = {
            baseURL: axiosParams.baseUrl || this.baseURL,
            headers: { ...this.baseHeaders, ...headers },
            timeout: axiosParams.timeout || this.timeout,
            validateStatus: status => status >= 200 && status < 400,
            ...axiosParams,
        };
        try {
            if (this.forceTimeout) { throw new AxiosTimeout(); }
            if (this.forceError) { throw new AxiosError(`fake internal error`, 500); }
            const response = await axios.request(params);
            logSuccess(this.logger, params, response, logLevel || this.logLevel);
            if (cacheKey) {
                this.logger.debug(`Cache set ${cacheKey}`);
                this.cache.set(cacheKey, response.data, cacheTtl);
            }
            return response.data;
        } catch (err) {
            const errorCode = err.response && err.response.status;
            logError(this.logger, params, err, errorLevels[errorCode]);
            throw err;
        }
    }

    async _timeTrackedAxiosCall({ timeTrackerLabel = this.timeTrackerLabel, currentAttempt = 0, ...args }) {
        let response = null;
        try {
            const callStartedAt = timeTracker.getTimestamp();
            response = await this._axiosCall(args);
            timeTracker.add(callStartedAt, timeTrackerLabel);
        } catch (e) {
            // Rethrow the error in case of timeout or if we tried enough times
            if (!e.response || currentAttempt >= this.retryCount) {
                throw e;
            }
            this.logger.info(`retrying request... try ${currentAttempt + 1}/${this.retryCount}`);
            response = this._timeTrackedAxiosCall({
                currentAttempt: currentAttempt + 1,
                ...args,
            });
        }
        return response;
    }

    get forceTimeout() {
        return this._forceTimeout;
    }

    set forceTimeout(forceTimeout) {
        if (process.env.NODE_ENV === `production`) {
            this.logger.error(`Can't force timeout in production mode !`);
        } else {
            this._forceTimeout = forceTimeout;
        }
    }

    get forceError() {
        return this._forceError;
    }

    set forceError(forceError) {
        if (process.env.NODE_ENV === `production`) {
            this.logger.error(`Can't force error in production mode !`);
        } else {
            this._forceError = forceError;
        }
    }
}

module.exports = AbstractApiClient;
