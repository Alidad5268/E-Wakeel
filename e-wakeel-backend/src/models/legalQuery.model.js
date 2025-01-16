const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LegalQuery = sequelize.define(
  "LegalQuery",
  {
    queryid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'queryid' // Map to snake_case column name
    },
    querycontent: {
      type: DataTypes.STRING,
      field: 'querycontent' // Map to snake_case column name
    },
    status: {
      type: DataTypes.STRING,
      field: 'status' // Map to snake_case column name
    },
    userid: {
      type: DataTypes.INTEGER,
      field: 'userid' // Map to snake_case column name
    }
  },
  { 
    timestamps: true,
    tableName: 'LegalQuery' // Ensure the table name is correct
  }
);

module.exports = LegalQuery;