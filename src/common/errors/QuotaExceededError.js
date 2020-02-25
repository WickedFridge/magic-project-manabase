/* eslint-disable semi */
const AbstractError = require(`./AbstractError`);

class QuotaExceededError extends AbstractError {
    constructor(message) {
        super(message, 403);
    }
}

module.exports = QuotaExceededError;
