const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/ApiError')
const { ratingService } = require('../services')

const rating = catchAsync(async (req, res) => {
  const user = await ratingService.getUserbyId(req.query.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  const slotid = await ratingService.getSlotId(req.query)
  if (!slotid.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Slot not found')
  } else {
    const user_rating = await ratingService.rating(req.query)
    res.status(httpStatus.CREATED).send(user_rating)
  }
})

module.exports = { rating }
