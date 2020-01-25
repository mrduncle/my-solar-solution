module.exports = function(sequelize, DataTypes) {
  let datetime = sequelize.define(
    "tbldatetimes",
    {
      datetimecol: {
        type: DataTypes.DATE,
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

  return datetime;
};
