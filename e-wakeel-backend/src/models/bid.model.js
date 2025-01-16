const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Bid = sequelize.define("Bid", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  advocateName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bidAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timeline: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  strategy: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Accepted", "Rejected"),
    defaultValue: "Pending",
  },
  queryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Bid;

