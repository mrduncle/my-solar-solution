module.exports = function(sequelize, DataTypes) {
  let locationDatetime = sequelize.define("locationDatetime", {});

  locationDatetime.associate = function(models) {
    locationDatetime.belongsTo(models.Location, {
      onDelete: "cascade"
    });

    locationDatetime.belongsTo(models.Datetime, {
      onDelete: "cascade"
    });
  };

  return locationDatetime;
};
