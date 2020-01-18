module.exports = function(sequelize, DataTypes) {
  let solar = sequelize.define("Solar", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    output: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cost: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    },
    life: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return solar;
};
