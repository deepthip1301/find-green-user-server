const moment = require('moment-timezone')
const slot = (sequelize, DataTypes) => {
  const slot = sequelize.define(
    'booking',
    {
      userId: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      slottime: {
        type: DataTypes.STRING,
        unique: false
      },
      stationId: {
        type: DataTypes.STRING,
        unique: false
      },
      
      stationName: {
        type: DataTypes.STRING,
        unique: false
      },
      bookingDate: {
        type: DataTypes.DATEONLY
      },
      duration: {
        type: DataTypes.STRING,
        unique: false
      },
      connectorType: {
        type: DataTypes.STRING,
        unique: false
      },
      capacity: {
        type: DataTypes.STRING,
        unique: false
      },
      tariff: {
        type: DataTypes.STRING,
        unique: false
      },
      bookingStatus: {
        type: DataTypes.STRING,
        defaultValue: 'booked'
      },
      rating: {
        type: DataTypes.STRING,
        allowNull: true
      },
      payment: {
        type: DataTypes.STRING,
        unique: false
      },
      createdAt: {
        type: DataTypes.DATE,
        get () {
          return moment(this.getDataValue('createdAt')).format('DD-MM-YYYY HH:mm')
        }
      },
      updatedAt: {
        type: DataTypes.DATE,
        get () {
          return moment(this.getDataValue('updatedAt')).format('DD-MM-YYYY HH:mm')
        }
      }
    },
    {
      timestamp: false
    }
  )
  return slot
}

module.exports = slot
