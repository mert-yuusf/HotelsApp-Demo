const { Room } = require("../models")
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middlewares/async-wrapper");
const Factory = require("./handlerFactory");

const roomsController = {
	getAll: asyncWrapper(async (req, res) => {
		const rooms = await Room.find({})
		res.status(StatusCodes.OK).json({
			result: rooms,
			state: "success"
		})
	}),

	getOne: asyncWrapper(async (req, res) => {
		const { id } = req.params;
		const hotel = await Room.findById(id)
		res.status(StatusCodes.OK).json({
			result: hotel,
			state: "success"
		})
	}),

	createOne: asyncWrapper(async (req, res) => {
		const room = await Room.create({ ...req.body })
		res.status(StatusCodes.CREATED).json({
			result: room,
			state: "success"
		})
	}),


	deleteOne: asyncWrapper(async (req, res) => {
		const { id } = req.params;
		const room = await Room.findByIdAndDelete(id);
		res.status(StatusCodes.OK).json({
			result: room,
			state: "success"
		})
	}),


	updateOne: asyncWrapper(async (req, res) => {
		const { id } = req.params;
		const room = await Room.findByIdAndUpdate(id, { ...req.body }, { new: true })
		res.status(StatusCodes.OK).json({
			result: room,
			state: "success"
		})
	}),
}

module.exports = roomsController;