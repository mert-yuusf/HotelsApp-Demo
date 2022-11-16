const express = require("express")
const {reviewsController} = require("../controllers");
const authenticateUser = require("../middlewares/authenticate-user");


const reviewsRoutes = express.Router();

reviewsRoutes.route("/reviews")
	.get([authenticateUser],reviewsController.getAll)
	.post([authenticateUser],reviewsController.createOne)


reviewsRoutes.route("/reviews/:id")
	.get([authenticateUser],reviewsController.getOne)
	.put([authenticateUser],reviewsController.updateOne)
	.delete([authenticateUser],reviewsController.deleteOne)

module.exports = reviewsRoutes;
