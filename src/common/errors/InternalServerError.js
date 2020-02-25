/* eslint-disable semi */
const AbstractError = require(`./AbstractError`);

class InternalServerError extends AbstractError {
    constructor(message) {
        super(message, 500);
    }
}

module.exports = InternalServerError;
