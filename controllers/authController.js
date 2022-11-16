const { User } = require("../models")
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middlewares/async-wrapper");
const BaseError = require("../errors");
const jwt = require("jsonwebtoken");

const authController = {
    signup: asyncWrapper(async (req, res) => {
        const user = await User.create({...req.body});
        const token = await jwt.sign(
            { payload: { userId: user._id } },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_LIFETIME
            }
        )
        res.status(StatusCodes.OK).json({
            result: token,
            status: "success",
            message: "account has created successfully"
        })
    }),


    login: asyncWrapper(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new BaseError.Bad_Request("no account for provided email")
        }

        const isCorrect = await user.comparePassword(password);
        if (!isCorrect) {
            throw new BaseError.Bad_Request("Please check your password")
        }

        const token = await jwt.sign(
            { payload: { userId: user._id } },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_LIFETIME
            }
        )

        res.status(StatusCodes.OK).json({
            result: token,
            status: "success",
            message: "account has created successfully"
        });
    }),


    logout: (req, res) => {
        res.status(StatusCodes.OK).json({
            result: null,
            status: "success",
            message: "logged out successfully"
        });
    },


    forgetPassword: (req, res) => {
        res.send("forget password")
    },


    resetPassword: (req, res) => {
        res.send("reset password")
    },
}

module.exports = authController;