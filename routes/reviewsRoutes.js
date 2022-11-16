const express = require("express")
const {reviewsController} = require("../controllers");
const authenticateUser = require("../middlewares/authenticate-user");


const reviewsRoutes = express.Router();

reviewsRoutes.use(authenticateUser);

reviewsRoutes.route("/reviews")
	.get(reviewsController.getAll)
	.post(reviewsController.createOne)


reviewsRoutes.route("/reviews/:id")
	.get(reviewsController.getOne)
	.put(reviewsController.updateOne)
	.delete(reviewsController.deleteOne)

module.exports = reviewsRoutes;
