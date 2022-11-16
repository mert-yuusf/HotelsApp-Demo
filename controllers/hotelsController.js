const { Hotel, Room } = require("../models")
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middlewares/async-wrapper");

const hotelsController = {
	getAll: asyncWrapper(async (req, res) => {
		const hotels = await Hotel.find({})
		res.status(StatusCodes.OK).json({
			result: hotels,
			state: "success"
		})
	}),

	getOne: asyncWrapper(async (req, res) => {
		const { id } = req.params;
		const hotel = await Hotel.findById(id);
		res.status(StatusCodes.OK).json({
			result: hotel,
			state: "success"
		})
	}),


	createOne: asyncWrapper(async (req, res) => {
		const hotel = await Hotel.create({ ...req.body })
		res.status(StatusCodes.CREATED).json({
			result: hotel,
			state: "success"
		})
	}),


	deleteOne: asyncWrapper(async (req, res) => {
		const { id } = req.params;
		const hotel = await Hotel.findByIdAndDelete(id);

		// remove all rooms on this hotel removed;
		await Room.deleteMany({ hotel: id });

		res.status(StatusCodes.OK).json({
			result: hotel,
			state: "success"
		})
	}),

	updateOne: asyncWrapper(async (req, res) => {
		const { id } = req.params;
		const hotel = await Hotel.findByIdAndUpdate(id, { ...req.body }, { new: true })
		res.status(StatusCodes.OK).json({
			result: hotel,
			state: "success"
		})
	}),
}

module.exports = hotelsController;