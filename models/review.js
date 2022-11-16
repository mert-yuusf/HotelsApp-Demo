const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
	content: {
		type: String,
		required: [true, "Please provide content of review"]
	},

	rating: {
		type: Number,
		min: 1,
		max: 5
	},

	hotel: {
		type: mongoose.Schema.ObjectId,
		ref: "Hotel",
		required: [true, "Please provide hotel"]
	},

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Please provide user"]
	},
},
	{ timestamps: true },
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.pre(/^find/, function (next) {
	this.populate({ path: "user", select: "_id firstName lastName avatar" })
	this.populate({ path: "hotel", select: "_id name" })
	next();
});

reviewSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Review", reviewSchema);