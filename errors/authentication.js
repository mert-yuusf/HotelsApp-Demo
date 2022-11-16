const { StatusCodes } = require("http-status-codes");
const BaseError = require("./base-error");


class UnAuthenticated extends BaseError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
        this.name = "Un_Authenticated";
    }
}

module.exports = UnAuthenticated;