// check if user has login or not before continue to selected route
const asyncWrapper = require("./async-wrapper");
const BaseError = require("../errors");
const jwt = require("jsonwebtoken");

const authenticateUser = asyncWrapper(async (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log(`👉 Checking token`)
	if (authHeader && authHeader.startsWith('Bearer')) {
		const token = authHeader.split(' ')[1];
		if (token && token !== "null") {
			const {payload} = jwt.verify(token, process.env.JWT_SECRET);
			const {userId} = payload;
			req.currentUserId = userId;
			next();
		} else {
			throw new BaseError.Bad_Request("Invalid Authentication");
		}
	} else {
		throw new BaseError.Bad_Request("Invalid Authentication");
	}
})


module.exports = authenticateUser;