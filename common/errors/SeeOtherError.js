/* eslint-disable semi */
const AbstractError = require(`common/errors/AbstractError`);

class SeeOtherError extends AbstractError {
    constructor(message) {
        super(message, 303);
    }
}

module.exports = SeeOtherError;
