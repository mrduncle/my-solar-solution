module.exports = function(sequelize, DataTypes) {
  let radiation = sequelize.define("Radiation", {});

  radiation.associate = function(models) {
    radiation.belongsTo(models.Location, {
      onDelete: "cascade"
    });

    radiation.belongsTo(models.Datetime, {
      onDelete: "cascade"
    });
  };

  return radiation;
};
