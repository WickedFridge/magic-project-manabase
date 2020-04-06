/* eslint-disable semi */
const AbstractError = require(`common/errors/AbstractError`);

class CallApiError extends AbstractError {
    constructor(message) {
        super(message, 500);
    }
}

module.exports = CallApiError;
