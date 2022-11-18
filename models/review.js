const mongoose = require('mongoose');
const Hotel = require('../models/hotel');
const reviewSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please provide content of review'],
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    hotel: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hotel',
      required: [true, 'Please provide hotel'],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.statics.calculateAverageRating = async function (hotelId) {
  const state = await this.aggregate([
    {
      $match: { hotel: hotelId },
    },
    {
      $group: {
        _id: '$hotel',
        averageRating: { $avg: '$rating' },
        ratingsQuantity: { $sum: 1 },
      },
    },
  ]);

  try {
    console.log({ state });
    await Hotel.findOneAndUpdate(
      { _id: hotelId },
      {
        ratingAverage: Math.ceil(state[0]?.averageRating),
        ratingsQuantity: state[0]?.ratingsQuantity,
      }
    );
  } catch (error) {
    console.log(`💥 --- ${error}`);
  }
};

// reviewSchema.pre(/^find/, function (next) {
//   this.populate({ path: 'user', select: '_id firstName lastName avatar' });
//   this.populate({ path: 'hotel', select: '_id name' });
//   next();
// });

reviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.hotel);
});

reviewSchema.post('update', async function () {
  await this.constructor.calculateAverageRating(this.hotel);
});

reviewSchema.pre('remove', async function (next) {
  console.log(this.hotel);
  await this.constructor.calculateAverageRating(this.hotel);
  next();
});

reviewSchema.set('toJSON', { virtuals: true });
reviewSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Review', reviewSchema);
