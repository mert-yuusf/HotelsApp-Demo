const {StatusCodes} = require("http-status-codes");

const Not_Found_Middleware = (req, res) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        result: null,
        result_message: {
            type: "error",
            message: "Not found",
            title: "Error"
        }
    })
}

module.exports = Not_Found_Middleware;