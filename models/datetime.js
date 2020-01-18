module.exports = function(sequelize, DataTypes) {
  let datetime = sequelize.define("Datetime", {
    datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  });

  return datetime;
};
