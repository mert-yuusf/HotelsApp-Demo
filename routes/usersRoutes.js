const express = require("express")
const { usersController } = require("../controllers");
const authenticateUser = require("../middlewares/authenticate-user");

const usersRoutes = express.Router();

usersRoutes.use(authenticateUser);


usersRoutes.route("/users").get(usersController.getAll)
usersRoutes.route("/users/me").get(usersController.getMe)
usersRoutes.route("/users/:id")
	.get(usersController.getOne)
	.put(usersController.updateOne)

module.exports = usersRoutes;
