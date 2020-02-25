class AxiosError {
    constructor(message, code, stack, data) {
        this.message = message;
        this.stack = stack;
        this.response = {
            status: code,
            data,
        };
    }
}

class AxiosTimeout {
    constructor() {
        this.message = `fake timeout`;
    }
}

module.exports = { AxiosError, AxiosTimeout };
