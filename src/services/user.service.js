const httpStatus = require('http-status')
const { models } = require('../models')
const tokenService = require('./token.service')
const { User, OTP, Token } = models
const { tokenTypes } = require('../config/tokens')
const logger = require('../config/logger')

const getIdbyOTP = async (id) => {
  const user = await OTP.findAll({ where: { userId: id } })
  return user
}

const createUser = async (userBody) => {
  if (await User.isEmailTakenUser(userBody.email)) {
    const user = await User.findAll({ where: { email: userBody.email } })
    return user
  }
  if (await User.isEmailTaken(userBody.email)) {
    logger.error('Email already taken')
    return { status: httpStatus.BAD_REQUEST, message: 'Email already taken' }
  } else {
    const newUser = await User.create(userBody)
    const user = await User.findAll({ where: { id: newUser.id } })
    return user
  }
}

const updateUserActive = async (userId) => {
  const updateUser = await User.update({
    userStatus: 'active'
  }, {
    where: {
      id: userId
    }
  })
  if (updateUser) {
    const User = await getUserById(userId)
    return User
  }
}
const getUserById = async (userId) => {
  return User.findByPk(userId)
}

const getUserByEmail = async (email) => {
  const user = await User.findAll({ where: { email, userStatus: 'active' } })
  if (!user || !(await User.isEmailTaken(email))) {
    logger.error('Incorrect email or Please SignUp')
    return { status: httpStatus.UNAUTHORIZED, message: 'Incorrect email or Please SignUp' }
  }
  return user
}

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    where: { token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false }
  })
  if (!refreshTokenDoc) {
    logger.error('Not found')
    return { status: httpStatus.NOT_FOUND, message: 'Not found' }
  }
  await refreshTokenDoc.destroy()
  return true
}

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshUser = async (refreshToken) => {
  const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH)
  if (refreshTokenDoc === null) {
    logger.error('Token not found')
    return { status: httpStatus.UNAUTHORIZED, message: 'Token not found' }
  }
  if (refreshTokenDoc.status == 498) {
    return { status: refreshTokenDoc.status, message: refreshTokenDoc.message }
  }
  const user = await getUserById(refreshTokenDoc.dataValues.userId)
  if (!user) {
    logger.error('Token not found')
    return { status: httpStatus.UNAUTHORIZED, message: 'Token not found' }
  }
  await refreshTokenDoc.destroy()
  return { status: httpStatus.OK, user, tokens: await tokenService.generateUserTokens(user) }
}

module.exports = {
  createUser,
  getIdbyOTP,
  getUserByEmail,
  getUserById,
  logout,
  refreshUser,
  updateUserActive
}
