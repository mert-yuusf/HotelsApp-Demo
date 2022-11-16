const express = require("express")
const { hotelsController } = require("../controllers");
const authenticateUser = require("../middlewares/authenticate-user");
const hotelsRoutes = express.Router();

hotelsRoutes.route("/hotels")
	.get([authenticateUser], hotelsController.getAll)
	.post([authenticateUser], hotelsController.createOne)

hotelsRoutes.route("/hotels/:id")
	.get([authenticateUser], hotelsController.getOne)
	.put([authenticateUser], hotelsController.updateOne)
	.delete([authenticateUser], hotelsController.deleteOne)

module.exports = hotelsRoutes;
