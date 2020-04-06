/* eslint-disable semi */
const AbstractError = require(`common/errors/AbstractError`);

class QuotaExceededError extends AbstractError {
    constructor(message) {
        super(message, 403);
    }
}

module.exports = QuotaExceededError;
