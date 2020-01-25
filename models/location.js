module.exports = function(sequelize, DataTypes) {
  let location = sequelize.define(
    "tbllocations",
    {
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
    },
    {
      timestamps: false
    }
  );

  return location;
};
