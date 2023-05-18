const { models } = require('../models')
const { User, slot } = models
const { Op } = require('sequelize')

// Get User by id
const getUserbyId = async (userId) => {
  return User.findByPk(userId)
}

const getSlotId = async (body) => {
  return slot.findAll({ where: [{ userId: body.userId }, { id: body.slotId }] })
}
const rating = async (body) => {
  const rate = body
  await slot.update({
    rating: body.rating
  }, {
    where: {
      [Op.and]:
     [{ userId: body.userId },
       { id: body.slotId }
     ]
    }
  })
  return rate
}

module.exports = {
  getUserbyId,
  getSlotId,
  rating
}
