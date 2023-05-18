const Station = (sequelize, DataTypes) => {
  const station = sequelize.define(
    'evcstation',
    {
      station_name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_address: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_area: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_city: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_pincode: {
        type: DataTypes.REAL,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_latitude: {
        type: DataTypes.REAL,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_longitude: {
        type: DataTypes.REAL,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_working_time: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_available_connector: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_connector_type: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_charger_type: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_charging: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_vehicle_type: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_capacity: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_tariff: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_amenities: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      station_status: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      timestamps: false
    }
  )

  return station
}

module.exports = Station
