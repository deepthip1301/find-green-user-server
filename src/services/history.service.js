const { models } = require('../models')
const { Op } = require('sequelize')
const today = new Date()
const { User, slot } = models

// Get User by id
const getUserbyId = async (userId) => {
  return User.findByPk(userId)
}

const viewHistory = async (query) => {
  if (query.filter == '15 days') {
    const fifteendays = new Date()
    fifteendays.setDate(fifteendays.getDate() - 15)
    return slot.findAll({
      where: {
        [Op.and]:
        [{ userId: query.userId },
          { bookingDate: { [Op.gte]: fifteendays, [Op.lt]: today } }]
      }
    })
  }
  if (query.filter == '1 month') {
    const oneMonth = new Date()
    oneMonth.setMonth(oneMonth.getMonth() - 1)
    return slot.findAll({
      where: {
        [Op.and]:
        [{ userId: query.userId },
          { bookingDate: { [Op.gte]: oneMonth, [Op.lt]: today } }]
      }
    })
  }
  if (query.filter == '3 months') {
    const threeMonths = new Date()
    threeMonths.setMonth(threeMonths.getMonth() - 3)
    return slot.findAll({
      where: {
        [Op.and]:
        [{ userId: query.userId },
          { bookingDate: { [Op.gte]: threeMonths, [Op.lt]: today } }]
      }
    })
  }
  if (query.filter == '6 months') {
    const sixMonths = new Date()
    sixMonths.setMonth(sixMonths.getMonth() - 6)
    return slot.findAll({
      where: {
        [Op.and]:
        [{ userId: query.userId },
          { bookingDate: { [Op.gte]: sixMonths, [Op.lt]: today } }]
      }
    })
  }
  if (query.filter == '1 year') {
    const oneYear = new Date()
    oneYear.setFullYear(oneYear.getFullYear() - 1)
    return slot.findAll({
      where: {
        [Op.and]:
        [{ userId: query.userId },
          { bookingDate: { [Op.gte]: oneYear, [Op.lt]: today } }]
      }
    })
  } else {
    const bookingHistory = await slot.findAll({
      where: {
        [Op.and]:
      [{ userId: query.userId },
        { bookingDate: { [Op.lt]: today } }]
      }
    })
    return bookingHistory
  }
}

const booking_status = async (userId) => {
  const bookedSlots = await slot.update({
    bookingStatus: 'completed'
  }, {
    where: {
      [Op.and]:
     [{ userId },
       { bookingDate: { [Op.lt]: today } },
       { bookingStatus: { [Op.or]: ['booked', 'open'] } }
     ]
    }
  })
  return bookedSlots
}

const rating = async (userId) => {
  const bookedSlots = await slot.update({
    rating: 'Unknown'
  }, {
    where: {
      [Op.and]:
     [{ userId },
       { rating: null }
     ]
    }
  })
  return bookedSlots
}

module.exports = {
  getUserbyId,
  viewHistory,
  booking_status,
  rating
}
