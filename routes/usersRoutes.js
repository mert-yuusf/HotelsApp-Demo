const express = require("express")
const {usersController} = require("../controllers");
const authenticateUser = require("../middlewares/authenticate-user");

const usersRoutes = express.Router();

usersRoutes.route("/users").get([authenticateUser],usersController.getAll)

usersRoutes.route("/users/me")
	.get([authenticateUser],usersController.getMe)

usersRoutes.route("/users/:id")
	.get([authenticateUser],usersController.getOne)
	.put([authenticateUser],usersController.updateOne)

module.exports = usersRoutes;
