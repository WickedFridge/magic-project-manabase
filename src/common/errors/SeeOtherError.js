/* eslint-disable semi */
const AbstractError = require(`./AbstractError`);

class SeeOtherError extends AbstractError {
    constructor(message) {
        super(message, 303);
    }
}

module.exports = SeeOtherError;
