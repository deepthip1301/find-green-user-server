const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const config = require('./config')
const { tokenTypes } = require('./tokens')
const { models } = require('../models')

const User = models.User

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload, done) => {
  try {
    console.log('payload is ', payload)
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type')
    }
    const user = await User.findByPk(payload.sub)
    console.log('user is ', user)
    if (!user) {
      return done(null, false)
    }
    done(null, user)
  } catch (error) {
    console.log(error)
    done(error, false)
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

module.exports = {
  jwtStrategy
}
