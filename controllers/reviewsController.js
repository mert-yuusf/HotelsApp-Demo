const { Review } = require('../models');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../middlewares/async-wrapper');

const reviewsController = {
  getAll: asyncWrapper(async (req, res) => {
    const reviews = await Review.find({});
    res.status(StatusCodes.OK).json({
      result: reviews,
      state: 'success',
    });
  }),

  getOne: asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const review = await Review.findById(id);
    res.status(StatusCodes.OK).json({
      result: review,
      state: 'success',
    });
  }),

  createOne: asyncWrapper(async (req, res) => {
    const review = await Review.create({
      ...req.body,
      user: req.currentUserId,
    });
    res.status(StatusCodes.CREATED).json({
      result: review,
      state: 'success',
    });
  }),

  deleteOne: asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const review = await Review.findOne({ _id: id });

    await review.remove();
    res.status(StatusCodes.OK).json({
      result: null,
      state: 'success',
    });
  }),

  updateOne: asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { content, rating } = req.body;
    const review = await Review.findOne({ _id: id });
    review.content = content;
    review.rating = rating;
    await review.save({ validateBeforeSave: false });
    res.status(StatusCodes.OK).json({
      result: review,
      state: 'success',
    });
  }),
};

module.exports = reviewsController;
