/* eslint-disable semi */
const AbstractError = require(`./AbstractError`);

class NotFoundError extends AbstractError {
    constructor(message) {
        super(message, 404);
    }
}

module.exports = NotFoundError;
