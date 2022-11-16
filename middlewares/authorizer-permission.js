const {User} = require("../models");
const {StatusCodes} = require("http-status-codes");
const authorizePermissions = (...roles) => {
	return async (req, res, next) => {

		const {role} = await User.findById(req.currentUserId);
		if (!roles.includes(role)) {
			res.status(StatusCodes.UNAUTHORIZED).json({msg: "Unauthorized, role is not valid"});
			return;
		}
		next();
	}
}

module.exports = authorizePermissions;