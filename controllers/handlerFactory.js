const {StatusCodes} = require("http-status-codes");
const asyncWrapper = require("../middlewares/async-wrapper");
const BaseError = require("../errors");

const Factory = {
	getAll: Model => asyncWrapper(async (req, res) => {
		const records = await Model.find({})
	}),

	createOne: Model => asyncWrapper(async (req, res) => {
		const record = await Model.create({...req.body});
		res.status(StatusCodes.CREATED).json({
			result: record,
			state: "success"
		})
	}),

	updateOne: Model => asyncWrapper(async (req, res) => {
		const {id} = req.params;
		const record = await Model.findByIdAndUpdate(id, {...req.body}, {new: true})
		res.status(StatusCodes.OK).json({
			result: record,
			state: "success"
		})
	}),

	deleteOne: Model => asyncWrapper(async (req, res) => {
		const {id} = req.params;
		const doc = await Model.findByIdAndDelete(id);
		if (!doc) {
			throw new BaseError.Bad_Request("Doc could not found with provided id");
		}
		res.status(StatusCodes.OK).json({
			result: null,
			state: "success"
		})
	})
}

module.exports = Factory;