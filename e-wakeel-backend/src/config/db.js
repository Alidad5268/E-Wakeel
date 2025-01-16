const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST, // Host
    dialect: "postgres", // Use PostgreSQL
    port: process.env.DB_PORT || 5432,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Sequelize connected to PostgreSQL successfully"))
  .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = sequelize;
