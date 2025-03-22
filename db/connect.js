// db/connect.js
const { Sequelize } = require("sequelize");
require("dotenv").config();
const chalk = require("chalk");

// Create a Sequelize instance
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  dialect: "mysql",
  logging: false, // Set to true to see SQL queries in logs
});

// Test the database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    // Sync models - { force: true } drops tables; { alter: true } updates structure
    console.log(chalk.green.bold("✅ MySQL Database connected successfully!"));
    await sequelize.sync({alter: true});
    console.log(chalk.blue.bold("🔄 Database models synced!"));
    console.log(`
      🌐 ${chalk.cyan("Host:")} ${chalk.yellow(process.env.MYSQL_HOST)}
      📊 ${chalk.cyan("Database:")} ${chalk.yellow(process.env.MYSQL_DB)}
      👤 ${chalk.cyan("User:")} ${chalk.yellow(process.env.MYSQL_USER)}
      🔌 ${chalk.cyan("Port:")} ${chalk.yellow(process.env.MYSQL_PORT)}
    `);
  } catch (error) {
    console.error(chalk.red.bold("❌ MySQL Connection Error:"), error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
