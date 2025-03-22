const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connect");
// const User = require("./User");

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  permissions: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // references: {
    //   model: User,
    //   key: "id",
    // },
  },
});

// Associations
// Role.belongsTo(User, { foreignKey: "createdBy" });
// User.hasMany(Role, { foreignKey: "createdBy" });

module.exports = Role;
