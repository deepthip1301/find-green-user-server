const Sequelize = require('sequelize')
const config = require('../config/config')
const fav = require('./fav.model')
const user = require('./user.model')
const token = require('./token.model')
const otp = require('./otp.models')
const station = require('./station.model')
const slot = require('./slot.model')

// pg.defaults.ssl = true;

const sequelize = new Sequelize(config.postgres.url, {
  dialect: 'postgres'
  // ssl: true,
  // dialectOptions: {
  //   // ssl: {
  //   //   require: true,
  //   //   rejectUnauthorized: false,
  //   // },
  // },
})

const models = {
  User: user(sequelize, Sequelize),
  Token: token(sequelize, Sequelize),
  OTP: otp(sequelize, Sequelize),
  Station: station(sequelize, Sequelize),
  Fav: fav(sequelize, Sequelize),
  slot: slot(sequelize, Sequelize)
}

models.Token.belongsTo(models.User)
models.OTP.belongsTo(models.User)

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

module.exports = { sequelize, models }
