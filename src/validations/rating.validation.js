const Joi = require('joi')

const rating = {
  query: Joi.object().keys({
    userId: Joi.required(),
    slotId: Joi.required(),
    rating: Joi.number().min(1).max(5).required()
  })
}

module.exports = { rating }
