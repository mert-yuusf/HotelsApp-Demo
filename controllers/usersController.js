const {User} = require("../models")
const {StatusCodes} = require("http-status-codes");
const asyncWrapper = require("../middlewares/async-wrapper");

const usersController = {
	getAll: asyncWrapper(async (req, res) => {
		const users = await User.find({});
		res.status(StatusCodes.OK).json({
			result: users,
			state: "success"
		})
	}),

	getOne: asyncWrapper(async (req, res) => {
		const {id} = req.params;
		const user = await User.findById(id).select("-password");
		res.status(StatusCodes.OK).json({
			result: user,
			state: "success"
		})
	}),

	getMe: asyncWrapper(async (req, res) => {
		const user = await User.findById(req.currentUserId).select("-password");
		res.status(StatusCodes.OK).json({
			result: user,
			state: "success"
		})
	}),

	updateOne: asyncWrapper(async (req, res) => {
		const {id} = req.params;
		const user = await User.findByIdAndUpdate(id, {...req.body}, {new: true})
		res.status(StatusCodes.OK).json({
			result: user,
			state: "success"
		})
	}),
}

module.exports = usersController;