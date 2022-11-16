const {StatusCodes} = require("http-status-codes");
const BaseError = require("./base-error");

class NotFound extends BaseError{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
        this.type = "Not_Found";
        this.title = "not found error";
    }
}

module.exports = NotFound;