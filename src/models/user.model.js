const User = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      mobileNumber: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      country: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      postalCode: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      vehicle_modal: {
        type: DataTypes.STRING,
        allowNull: true
      },
      vehicle_no: {
        type: DataTypes.STRING,
        allowNull: true
      },
      connector_type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      profile_pic: {
        type: DataTypes.STRING,
        allowNull: true
      },
      userStatus: {
        type: DataTypes.STRING,
        defaultValue: 'deactive'
      }

    },
    {
      timestamps: true
    }
  )
//user.sync({alter: { drop: false }}).then(() => {
  //  console.log("User Model synced");
//    });
	
  user.isEmailTakenUser = async function (email) {
    const userFound = await this.findOne({
      where: {
        email,
        userStatus: 'deactive'
      }
    })
    return !!userFound
  }

  /**
   * Check if email is taken
   * @param {string} email - The user's email
   * @returns {Promise<boolean>}
   */
  user.isEmailTaken = async function (email) {
    const userFound = await this.findOne({
      where: {
        email,
        userStatus: 'active'
      }
    })
    return !!userFound
  }
  
  return user
}

module.exports = User
