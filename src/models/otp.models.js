
const OTP = (sequelize, DataTypes) => {
  const otp = sequelize.define(
    'otp',
    {

      otp: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      createAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
      // userId:{
      //   type: DataTypes.INTEGER,
      //   unique: true,
      //   allowNull: false,
      //   validate: {
      //     notEmpty: true,
      //   },
      // }
    },
    {
      timestamps: false
    }
  )
  return otp
}

module.exports = OTP
