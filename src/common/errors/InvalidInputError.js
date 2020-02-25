/* eslint-disable semi */
const AbstractError = require(`./AbstractError`);

class InvalidInputError extends AbstractError {
    constructor(message) {
        super(message, 400);
    }
}

module.exports = InvalidInputError;
