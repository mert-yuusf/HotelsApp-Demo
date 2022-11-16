const mongoose = require("mongoose");
const slugify = require("slugify");

const hotelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide name of hotel"],
		trim: true,
	},
	slug: {
		type: String,
		default: undefined
	},
	description: {
		type: String,
		default: null
	},
	ratingAverage: {
		type: Number,
		default: 3
	},
	ratingsQuantity: {
		type: Number,
		default: 0
	},

	location: {
		type: {
			type: String,
			default: "Point",
			enum: ["Point"]
		},
		address: String,
		longitude: Number,
		latitude: Number,
	},

	openedAt: {
		type: Date,
		default: null
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
	// rooms: {
	// 	type: [mongoose.Schema.Types.ObjectId],
	// 	ref: "Room",
	// 	default: []
	// },
	// averageRoomPrice: {
	// 	type: Number,
	// 	default: 0
	// },
	//
	// roomsCount: {
	// 	type: Number,
	// 	default: 0
	// },
}, {timestamps: true}, {toJSON: {virtuals: true}, toObject: {virtuals: true}});


// Slugify name of hotel
hotelSchema.pre("save", async function (next) {
	this.slug = slugify(this.name, {lower: true})
	next();
});



// virtual properties
hotelSchema.virtual("reviews",{
	ref:"Review",
	foreignField:"hotel",
	localField:"id",
});


hotelSchema.pre(/^findOne/,async function(next){
	this.populate({path:"reviews"})
	next();
})
hotelSchema.set("toJSON",{virtuals:true})
module.exports = mongoose.model("Hotel", hotelSchema)