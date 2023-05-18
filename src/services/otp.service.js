const { models } = require('../models')
require('dotenv').config()
const bcrypt = require('bcrypt')

const httpStatus = require('http-status')
const { userService } = require('../services')
const logger = require('../config/logger')
const { defaultOtp } = require('../config/config')

const { OTP } = models

// generateOTP
const generateOTP = () => {
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`
  return otp
}

// saveOTP to Postgress
const saveOTP = async (otp, id) => {
  const saltRounds = 10
  const hashedOTP = await bcrypt.hash(otp, saltRounds)
  const OTPData = await OTP.create({
    otp: hashedOTP,
    createAt: Date.now(),
    expiresAt: Date.now() + 360000,
    userId: id
  })
  return OTPData
}

const generateUserOTP = async (user) => {
  const accessOTP = generateOTP()
  const OTPData = await saveOTP(accessOTP, user)
  return accessOTP
}

// verify OTP
const verifyotp = async ({ userId, otp }, res) => {
  try {
    if (!userId || !otp) {
      logger.error('Empty OTP details are not allowed')
      return { status: httpStatus.UNAUTHORIZED, message: 'Empty OTP details are not allowed' }
    } else {
      const UserOTPVerificationRecords = await userService.getIdbyOTP(userId)
      if (UserOTPVerificationRecords.length === 0) {
        logger.error("Account record doesn't exist or has been verified already. Please sign up or log in.")
        return { status: httpStatus.UNAUTHORIZED, message: 'Account record doesnt exist or has been verified already. Please sign up or log in.' }
      } else {
        /** for development purpose */
        if (defaultOtp && defaultOtp === otp) {
          await OTP.destroy({ where: { userId } })
          return { status: httpStatus.OK, message: 'login success' }
        }
        const { expiresAt } = UserOTPVerificationRecords[0]
        const hashedOTP = UserOTPVerificationRecords[0].otp
        if (expiresAt < Date.now()) {
          await OTP.destroy({ where: { userId } })
          logger.error('code has expired. Please request agin.')
          return { status: httpStatus.REQUEST_TIMEOUT, message: 'code has expired. Please request agin.' }
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP)
          if (!validOTP) {
            logger.error('invalid OTP. Check your inbox.')
            return { status: 498, message: 'invalid OTP. Check your inbox.' }
          } else {
            await OTP.destroy({ where: { userId } })
            logger.info('Login Successfully')
            return { status: httpStatus.OK, message: 'login success' }
          }
        }
      }
    }
  } catch (err) {
    logger.error(err.message)
    return { status: httpStatus.BAD_REQUEST, message: err.message }
  }
}

// resend OTP
const resendotp = async ({ userId, email }, res) => {
  try {
    if (!userId || !email) {
      logger.error('Empty OTP details are not allowed')
      return { status: httpStatus.UNAUTHORIZED, message: 'Empty OTP details are not allowed' }
    } else {
      await OTP.destroy({ where: { userId } })
      const otp = await generateUserOTP(userId)
      return { OTP: otp, status: httpStatus.OK }
    }
  } catch (err) {
    logger.error(err.message)
    return { status: httpStatus.BAD_REQUEST, message: err.message }
  }
}

module.exports = {
  saveOTP,
  generateUserOTP,
  verifyotp,
  resendotp
}
