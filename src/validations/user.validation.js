const Joi = require('joi')

const register = {
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(55).pattern(/^[A-Za-z ]*$/),
    email: Joi.string().required().lowercase().email(),
    mobileNumber: Joi.string().required().length(10).pattern(/^[0-9]{10}$/).messages({ 'string.pattern.base': 'Phone number must have 10 digits and only numbers here.' }),
    country: Joi.string().required().pattern(/^[A-Za-z ]*$/).messages({ 'string.pattern.base': 'Enter valid country name' }),
    postalCode: Joi.string().required().length(6).pattern(/^\d+$/).messages({ 'string.pattern.base': 'enter valid postal number' })
  })
}
// Verify OTP Validation
const verifyotp = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    otp: Joi.string().required().length(4)
  })
}

// Resend OTP Validation
const resendotp = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    email: Joi.string().required().lowercase().email()
  })
}

// Login From Validation
const login = {
  body: Joi.object().keys({
    email: Joi.string().required().lowercase().email()
  })
}

const logout = {
  body: Joi.object().keys({}),
  cookies: Joi.object()
    .keys({
      refreshToken: Joi.string().required()
    })
    .unknown(true)
}

const refreshTokens = {
  body: Joi.object().keys({}),
  cookies: Joi.object()
    .keys({
      refreshToken: Joi.string().required()
    })
    .unknown(true)
}

module.exports = {
  register,
  verifyotp,
  resendotp,
  login,
  logout,
  refreshTokens
}
