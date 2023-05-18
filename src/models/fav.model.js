const Fav = (sequelize, DataTypes) => {
  const Fav = sequelize.define('Favor', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    stationId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    
  });

  return Fav;
};

module.exports = Fav;
