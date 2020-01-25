module.exports = function(sequelize, DataTypes) {
  let radiation = sequelize.define(
    "tblradiations", 
    {
      radiation: {
        type: DataTypes.INTEGER,
        allowNull: false
  }
},
{
    timestamps: false
  });

  radiation.associate = function(models) {
    radiation.belongsTo(models.tbllocations, {
      onDelete: "cascade"
    });

    radiation.belongsTo(models.tbldatetimes, {
      onDelete: "cascade"
    });
  };

  return radiation;
};
