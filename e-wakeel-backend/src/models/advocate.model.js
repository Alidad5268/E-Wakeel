const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Adjust the path to your actual db config file

const Advocate = sequelize.define(
  "Advocate",
  {
    advocateId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "advocateid",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "specialty",
    },
    contactInfo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "contactinfo",
    },
  },
  {
    timestamps: false,
    tableName: "Advocate",
  }
);

Advocate.getAllAdvocates = async function () {
  try {
    await sequelize.sync({ alter: true });
    const advocates = await Advocate.findAll();
    return advocates;
  } catch (error) {
    console.error("Error fetching advocates:", error);
    throw error;
  }
};

module.exports = Advocate;
