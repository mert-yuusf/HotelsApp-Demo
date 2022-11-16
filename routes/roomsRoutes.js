const express = require("express")
const { roomsController } = require("../controllers");
const authenticateUser = require("../middlewares/authenticate-user");
const authorizePermissions = require("../middlewares/authorizer-permission");

const roomsRoutes = express.Router();

roomsRoutes.use(authenticateUser);

roomsRoutes.route("/rooms")
	.get(roomsController.getAll)
	.post(roomsController.createOne)

roomsRoutes.route("/rooms/:id")
	.get(roomsController.getOne)
	.put(roomsController.updateOne)
	.delete(roomsController.deleteOne)

module.exports = roomsRoutes;
