const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Case = require("./case.model");

const Notification = sequelize.define(
  "Notification",
  {
    notificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    notificationType: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  { timestamps: true }
);

Notification.belongsTo(Case, { foreignKey: "caseId" });

module.exports = Notification;
