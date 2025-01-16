const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); 

const Case = sequelize.define(
  "Case",
  {
    caseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "caseid",
    },
    caseType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "casetype",
    },
    caseStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Open",
      field: "casestatus",
    },
    courtDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "courtdate",
    },
    queryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "queryid",
      references: {
        model: "LegalQuery",
        key: "queryid",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: false,
    tableName: "Case",
  }
);

Case.getAllCases = async function () {
  try {
    await sequelize.sync({ alter: true });
    const cases = await Case.findAll();
    return cases;
  } catch (error) {
    console.error("Error fetching cases:", error);
    throw error;
  }
};

module.exports = Case;
