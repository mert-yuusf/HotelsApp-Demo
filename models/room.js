const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide name of hotel"],
		trim: true,
	},
	description: {
		type: String,
		default: null
	},
	area: {
		type: Number,
		min: [0, "Area must be greater than 0"]
	},
	beds: {
		type: Number,
		min: [0, "Area must be greater than 0"]
	},
	baths: {
		type: Number,
		min: [0, "should be at less one bath"]
	},
	wifi: {
		type: Boolean,
		default: null
	},
	tv: {
		type: Boolean,
		default: null
	},
	airConditioning: {
		type: Boolean,
		default: null
	},
	price: {
		type: Number,
		min: [0, "Price should be at less 0"],
		required: [true, "Please provide price of room"],
	},
	floor: {
		type: Number,
		required: [true, "Please provide floor of room"],
	},

	images: [
		{
			type: {
				type: String,
				default: "Media",
				enum: ["Media"]
			},
			url: String,
			size: Number,
			mimetype: String
		}
	],

	hotel: {
		type: mongoose.Schema.ObjectId,
		ref: "Hotel",
		required: [true, "Please provide hotel id"],
	}
},
	{ timestamps: true }
);

roomSchema.pre(/^find/, async function (next) {
	this.populate({ path: "hotel", select: "_id name location" })
	next();
})

roomSchema.set("toJSON", { virtuals: true });
roomSchema.set("toObject", { virtuals: true });
module.exports = mongoose.model("Room", roomSchema)