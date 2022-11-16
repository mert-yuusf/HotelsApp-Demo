const {StatusCodes} = require("http-status-codes");
const BaseError = require("./base-error");


class INTERNAL_SERVER_ERROR extends BaseError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        this.type = "INTERNAL_SERVER_ERROR";
        this.title = "internal server error";
    }
}

module.exports = INTERNAL_SERVER_ERROR;