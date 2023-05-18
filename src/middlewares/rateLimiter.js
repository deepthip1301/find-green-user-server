const rateLimit = require('express-rate-limit')

const userLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true
})

module.exports = {
  userLimiter
}
