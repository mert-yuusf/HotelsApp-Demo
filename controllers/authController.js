const { User } = require("../models")
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middlewares/async-wrapper");
const BaseError = require("../errors");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils");

const authController = {
    signup: asyncWrapper(async (req, res) => {
        const user = await User.create({ ...req.body });
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


    logout: asyncWrapper((req, res) => {
        res.status(StatusCodes.OK).json({
            result: null,
            status: "success",
            message: "logged out successfully"
        });
    }),


    forgetPassword: asyncWrapper(async (req, res) => {
        const { email } = req.body;
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new BaseError.Bad_Request("User dose not found")
        }

        const restToken = await user.generateRestToken();

        // const restUrl = `${req.protocol}://${req.get("host")}/auth/rest`;
        const emailContent = `Your rest token is : ${restToken}`;

        try {
            await sendMail({
                to: user.email,
                subject: "Rest Password",
                content: emailContent
            });
        } catch (error) {
            console.log(error);
            user.passwordResetToken = null;
            user.passwordResetExpire = null;
            await user.save({ validateBeforeSave: false });
        }

        res.status(StatusCodes.OK).json({
            result: true,
            status: "success",
            message: "Email has sent successfully"
        });
    }),


    resetPassword: asyncWrapper(async (req, res) => {
        const { restToken, newPassword } = req.body;
        const user = await User.findOne({ passwordResetToken: restToken });
        if (!user) {
            throw new BaseError.Bad_Request("User dose not found");
        }
        if (user) {
            if (newPassword) {
                user.password = newPassword;
                user.passwordResetExpire = null;
                user.passwordResetToken = null;
                await user.save({ validateBeforeSave: false });
            }
        }
        res.status(StatusCodes.OK).json({
            result: true,
            status: "success",
            message: "Password has updated"
        })
    }),
}

module.exports = authController;