const express = require("express")
const {roomsController} = require("../controllers");
const authenticateUser = require("../middlewares/authenticate-user");
const authorizePermissions = require("../middlewares/authorizer-permission");

const roomsRoutes = express.Router();

roomsRoutes.route("/rooms")
	.get([authenticateUser],roomsController.getAll)
	.post([authenticateUser],roomsController.createOne)


roomsRoutes.route("/rooms/:id")
	.get([authenticateUser],roomsController.getOne)
	.put([authenticateUser],roomsController.updateOne)
	.delete([authenticateUser],roomsController.deleteOne)

module.exports = roomsRoutes;
