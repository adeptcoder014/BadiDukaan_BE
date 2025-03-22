// models/Admin.js

const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connect"); // Ensure correct path

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Roles", // Must match the table name exactly
      key: "id",
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_by: {
    type: DataTypes.STRING,
    defaultValue: "system",
  },
  updated_by: {
    type: DataTypes.STRING,
    defaultValue: "system",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Admin;
