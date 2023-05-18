const httpStatus = require('http-status')
const slotService = require('../services/slotService')
const catchAsync = require('../utils/catchAsync')


const addSlots = catchAsync(async (req, res) => {
  const {
    userId,
    bookingId,
    bookingDate,
    bookingTime,
    duration,
    connectorType,
    capacity,
    tariff,
    payment
  } = req.body

  const augus = await slotService.addSlots(req.body)

  res.status(httpStatus.CREATED).json({ Notification: 'Booked Successfully' })
  return (userId, stationId)
})

const removeSlots = catchAsync(async (req, res) => {
  const { userId, bookingId } = req.body

  console.log(req.body)
  const jeba = await slotService.removeSlots(req.body)
  console.log(jeba)
  res.status(httpStatus.CREATED).json({ Notification: 'Your Booking was Cancelled ' })
})

const viewSlots = catchAsync(async (req, res) => {
  const { userId } = req.body

  console.log(req.body)
  const All_Slots = await slotService.viewSlots(req.body)
  console.log(All_Slots)
  res.status(httpStatus.CREATED).send({ All_Slots })
  res.status(httpStatus.OK).send({ All_Slots })
  res.status(httpStatus.CREATED).json({ Notification: 'Your Bookings List' })
})

const viewcancelledSlots = catchAsync(async (req, res) => {
  const { userId } = req.body

  console.log(req.body)
  const All_Slots = await slotService.viewcancelledSlots(req.body)
  console.log(All_Slots)
  res.status(httpStatus.CREATED).send({ All_Slots })
  res.status(httpStatus.OK).send({ All_Slots })
  res.status(httpStatus.CREATED).json({ Notification: 'Your Bookings List' })
})

const viewupcomingslots = catchAsync(async (req, res) => {
  const { userId } = req.body

  console.log(req.body)
  const All_Slots = await slotService.viewupcomingslots(req.body)
  console.log(All_Slots)
  res.status(httpStatus.CREATED).send({ All_Slots })
  res.status(httpStatus.OK).send({ All_Slots })
  res.status(httpStatus.CREATED).json({ Notification: 'Your Bookings List' })
})

module.exports = {
  addSlots,
  removeSlots,
  viewSlots,
  viewcancelledSlots,
  viewupcomingslots
}
