const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Please provide firstName"],
		trim: true
	},

	lastName: {
		type: String,
		required: [true, "Please provide firstName"],
		trim: true
	},

	email: {
		type: String,
		required: [true, "Please provide firstName"],
		trim: true,
		unique: [true, "Please provide your email"],
		lowercase: true,
		validate: [validator.isEmail, "Please provide valid email"]
	},

	avatar: {
		type: String,
		default: gravatar.url(this.email, { s: '100', r: 'x', d: 'retro' }, false)
	},

	password: {
		type: String,
		required: [true, "Please provide password"],
		minLength: [4, "password min length 4 char"],
		trim: true
	},

	passwordResetExpire: {
		type: String,
		default: null
	},

	role: {
		type: String,
		enum: {
			values: ["admin", "company", "customer"],
			message: "{VALUE} is not supported value"
		},
		default: "customer"
	},

}, { timestamps: true });


// encrypt password before save it to database
userSchema.pre("save", async function (next) {
	// check if the provided password is valid like defined in schema
	if (!this.isModified("password")) return;
	// hash password
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.comparePassword = async function (providedPassword) {
	return await bcrypt.compare(providedPassword, this.password);
}

// generate rest token
userSchema.methods.generateRestToken = async function () {
	const restToken = crypto.randomBytes(32).toString("hex");
	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(restToken)
		.digest("hex");
	// add 10 minutes as expire time
	this.passwordResetExpire = Date.now() + 10 * 60 * 1000;
	await this.save({ validateBeforeSave: false });
	return this.passwordResetToken;
};


// Virtuals Properties
userSchema.virtual("reviews", {
	ref: "Review",
	foreignField: "user",
	localField: "id",
})


userSchema.pre(/^findOne/, async function (next) {
	this.populate({ path: "reviews" });
	next();
})

userSchema.set("toJSON", { virtuals: true })
userSchema.set("toObject", { virtuals: true })

module.exports = mongoose.model("User", userSchema);