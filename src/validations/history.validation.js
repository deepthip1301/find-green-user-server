const Joi = require('joi')

const viewHistory = {
  query: Joi.object().keys({
    userId: Joi.string().required(),
    filter: Joi.string().allow('')
  })
}

module.exports = { viewHistory }
