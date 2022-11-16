const {StatusCodes} = require("http-status-codes");
const BaseError = require("./base-error");


class BadRequest extends BaseError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
        this.name = "BAD_REQUEST";
    }
}

module.exports = BadRequest;