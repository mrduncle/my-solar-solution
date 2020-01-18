module.exports = function(sequelize, DataTypes) {
  let location = sequelize.define("Location", {
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  });

  return location;
};
