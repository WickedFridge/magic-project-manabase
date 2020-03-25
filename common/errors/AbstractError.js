class AbstractError extends Error {
    constructor(message, errorCode) {
        super(message || ``);
        this.name = this.constructor.name;
        this.code = errorCode;
    }
}

module.exports = AbstractError;
