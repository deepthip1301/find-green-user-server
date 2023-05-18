const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/ApiError')
const { historyService } = require('../services')

const viewHistory = catchAsync(async (req, res) => {
  const user = await historyService.getUserbyId(req.query.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  if (user.userStatus == 'deleted') {
    throw new ApiError(httpStatus.NOT_FOUND, 'User has been deleted')
  }
  await historyService.booking_status(req.query.userId)
  await historyService.rating(req.query.userId)
  const history = await historyService.viewHistory(req.query)
  if (history.length === 0) {
    res.status(httpStatus.OK).send('No Booking History')
  } else {
    res.status(httpStatus.OK).send(history)
  }
})

module.exports = { viewHistory }
