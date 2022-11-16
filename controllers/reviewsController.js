const {Review} = require("../models")
const {StatusCodes} = require("http-status-codes");
const asyncWrapper = require("../middlewares/async-wrapper");

const reviewsController = {
	getAll: asyncWrapper(async (req, res) => {
		const reviews = await Review.find({});

		res.status(StatusCodes.OK).json({
			result: reviews,
			state: "success"
		})
	}),

	getOne: asyncWrapper(async (req, res) => {
		const {id} = req.params;
		const review = await Review.findById(id);
		res.status(StatusCodes.OK).json({
			result: review,
			state: "success"
		})
	}),


	createOne: asyncWrapper(async (req, res) => {
		const review = await Review.create({...req.body, user: req.currentUserId})
		res.status(StatusCodes.CREATED).json({
			result: review,
			state: "success"
		})
	}),


	deleteOne: asyncWrapper(async (req, res) => {
		const {id} = req.params;
		const review = await Review.findByIdAndDelete(id);
		res.status(StatusCodes.OK).json({
			result: review,
			state: "success"
		})
	}),

	updateOne: asyncWrapper(async (req, res) => {
		const {id} = req.params;
		const review = await Review.findByIdAndUpdate(id, {...req.body}, {new: true})
		res.status(StatusCodes.OK).json({
			result: review,
			state: "success"
		})
	}),
}




module.exports = reviewsController;