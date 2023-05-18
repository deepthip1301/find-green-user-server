
const Joi = require('joi')

const addSlots = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    slottime:Joi.string().required(),
    stationId: Joi.string().required(),
    stationName: Joi.string().required(),
    bookingDate: Joi.string().required(),
    duration: Joi.string().required(),
    connectorType: Joi.string().required(),
    capacity: Joi.string().required(),
    tariff: Joi.string().required(),
    payment: Joi.string(),
  })
}

const removeSlots = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    bookingId: Joi.string().required()
  })
}

const viewSlots = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    stationId: Joi.string().required(),
    stationName: Joi.string().required(),
    bookingDate: Joi.string().required(),
    duration: Joi.string().required(),
    connectorType: Joi.string().required(),
    capacity: Joi.string().required(),
    tariff: Joi.string().required(),
    payment: Joi.string().required()
  })
}
const viewupcomingslots = {
  query: Joi.object().keys ({
    userId: Joi.string().required()
  })
}

module.exports = {
  addSlots,
  removeSlots,
  viewSlots,
  viewupcomingslots
}
