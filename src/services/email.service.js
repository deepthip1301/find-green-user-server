const nodemailer = require('nodemailer')
const config = require('../config/config')
const logger = require('../config/logger')
const httpStatus = require('http-status')

const transport = nodemailer.createTransport(config.email.smtp)
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'))
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, html) => {
  try {
    const msg = { from: config.email.from, to, subject, html }
    await transport.sendMail(msg)
    return true
  } catch (err) {
    return { message: err.message }
  }
}

/**
* Send OTP email
* @param {string} to
* @param {string} token
* @returns {Promise}
*/
const sendOTPEmail = async (to, OTP) => {
  const subject = 'OTP Verification'
  const html = `<div  style="font: 1.2em "Fira Sans", sans-serif;font-weight: 500">Dear User,<br><br>
    Please enter below OTP to EV Station Login Page.<br>

    <span style="font-size: 1.5em;font-weight: 540;background-color:yellow">${OTP}</span></br><br>

    <b>Note:</b> This OTP is valid for the next <b>5 minutes</b> only.<br><br> 

    Do not share this OTP with anyone.</div>`
  const sendMail = await sendEmail(to, subject, html)
  if (sendMail == true) {
    return { status: httpStatus.OK, message: 'OTP send the mail' }
  } else {
    return { status: 417, message: sendMail.message }
  }
}

module.exports = {
  transport,
  sendEmail,
  sendOTPEmail
}
