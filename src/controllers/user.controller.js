const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { userService, tokenService, emailService, OTPService } = require('../services')
const logger = require('../config/logger')

// register
const register = catchAsync(async (req, res) => {
  const user = await (userService.createUser(req.body))
  if (user.status == 400) {
    res.status(user.status).json({ status: user.status, message: user.message })
  } else {
    const otp = await OTPService.generateUserOTP(user[0].id)
    const emailSend = await emailService.sendOTPEmail(user[0].email, otp)
    if (emailSend.status == 200) {
      logger.info('mail send the otp')
      res.json({
        status: 'pending',
        message: 'mail send the otp',
        data: {
          userId: user[0].id,
          email: user[0].email
        }
      })
    } else {
      logger.error(emailSend.message)
      res.status(emailSend.status).json({ status: emailSend.status, message: emailSend.message })
    }
  }
})

// verify OTP
const verifyOTP = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.body.userId)
  if (user.length === 0) {
    logger.error('User not found')
    res.status(httpStatus.NOT_FOUND), json({ status: httpStatus.NOT_FOUND, message: 'User not found' })
  }
  const otp = await OTPService.verifyotp(req.body, res)
  const updateUser = await userService.updateUserActive(user.id)
  const tokens = await tokenService.generateUserTokens(user)

  if (otp.status == 200) {
    res.cookie('refreshToken', tokens.refresh.token, {
      maxAge: tokens.refresh.maxAge,
      httpOnly: true,
      sameSite: 'none',
      secure: true
    })
      .send({ updateUser, token: tokens.access })
  } else {
    res.status(otp.status).json({ status: otp.status, message: otp.message })
  }
})

// resend OTP
const resendOTP = catchAsync(async (req, res) => {
  const otp = await OTPService.resendotp(req.body, res)
  if (otp.status != 200) {
    res.status(otp.status).json({ status: otp.status, message: otp.message })
  } else {
    const emailSend = await emailService.sendOTPEmail(req.body.email, otp.OTP)
    if (emailSend.status == 200) {
      res.status(emailSend.status).json({ status: emailSend.status, message: 'Resend OTP in your Email' })
      logger.info('Resend OTP in your Email')
    } else {
      res.status(emailSend.status).json({ status: emailSend.status, message: emailSend.message })
    }
  }
})

// Login
const login = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.body.email)
  if (user.status == 401) {
    res.status(user.status).json({ status: user.status, message: user.message })
  } else {
    const otp = await OTPService.generateUserOTP(user[0].id)
    const emailSend = await emailService.sendOTPEmail(user[0].email, otp)
    if (emailSend.status == 200) {
      logger.info('mail send the otp')
      res.json({
        status: 'pending',
        message: 'mail send the otp',
        data: {
          userId: user[0].id,
          email: user[0].email
        }
      })
    } else {
      res.status(emailSend.status).json({ status: emailSend.status, message: emailSend.message })
    }
  }
})

const logout = catchAsync(async (req, res) => {
  const LogOut = await userService.logout(req.cookies.refreshToken)
  if (LogOut == true) {
    logger.info('user Logout the page')
    res.status(httpStatus.NO_CONTENT).send()
  } else {
    logger.error(LogOut.message)
    res.status(LogOut.status).json({ status: LogOut.status, message: LogOut.message })
  }
})

const refreshTokens = catchAsync(async (req, res) => {
  const { message, status, user, tokens } = await userService.refreshUser(req.cookies.refreshToken)
  if (status == 200) {
    logger.info('access Tokens send successfully')
    res
      .cookie('refreshToken', tokens.refresh.token, {
        maxAge: tokens.refresh.maxAge,
        httpOnly: true,
        sameSite: 'none',
        secure: true
      })
      .send({ user, token: tokens.access })
  } else {
    res.status(status).json({ status, message })
  }
})

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  verifyOTP,
  resendOTP
}
