const Joi = require('joi')
const profile = {
  params: Joi.object().keys({
    userId: Joi.string().required().pattern(/^[0-9]+$/)
  })
}

const editProfile = {
  params: Joi.object().keys({
    userId: Joi.string().required().pattern(/^[0-9]+$/)
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().min(3).max(55).pattern(/^[A-Za-z ]*$/),
      mobileNumber: Joi.string().length(10).pattern(/^[0-9]{10}$/).messages({ 'string.pattern.base': 'Enter valid mobile number' }),
      country: Joi.string().pattern(/^[A-Za-z]+$/).messages({ 'string.pattern.base': 'Enter valid country name' }),
      postalCode: Joi.string().length(6).pattern(/^\d+$/).messages({ 'string.pattern.base': 'Enter valid postal number' }),
      vehicle_modal: Joi.string().pattern(/^[A-Za-z]+$/).messages({ 'string.pattern.base': 'Enter valid vehicle model' }),
      vehicle_no: Joi.string().pattern(/^[A-Za-z0-9 ]*$/).messages({ 'string.pattern.base': 'Enter valid vehicle number' }),
      connector_type: Joi.string().pattern(/^[A-Za-z0-9 ]*$/).messages({ 'string.pattern.base': 'Enter valid connector type' })
    })
    .min(1)
}

const profilePic = {
  params: Joi.object().keys({
    userId: Joi.string().required().pattern(/^[0-9]+$/)
  }),
  body: Joi.object().keys({
    profile_pic: Joi.any()
  })
}
const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().required().pattern(/^[0-9]+$/)
  })
}

const deleteProfilePic = {
  params: Joi.object().keys({
    userId: Joi.string().required().pattern(/^[0-9]+$/)
  })
}

module.exports = {
  profile,
  editProfile,
  profilePic,
  deleteUser,
  deleteProfilePic
}
