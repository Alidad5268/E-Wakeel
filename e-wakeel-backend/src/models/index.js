const User = require("./user.model");
const Advocate = require("./advocate.model");
const LegalQuery = require("./legalQuery.model");
const Bid = require("./bid.model");
const Case = require("./case.model");
const Document = require("./document.model");
const Notification = require("./notification.model");

// Define relationships
User.hasMany(LegalQuery, { foreignKey: "userId" });
LegalQuery.belongsTo(User, { foreignKey: "userId" });

Advocate.hasMany(Bid, { foreignKey: "advocateId" });
Bid.belongsTo(LegalQuery, { foreignKey: "queryId" });

LegalQuery.hasOne(Case, { foreignKey: "queryId" });
Case.belongsTo(LegalQuery, { foreignKey: "queryId" });

Case.hasMany(Document, { foreignKey: "caseId" });
Case.hasMany(Notification, { foreignKey: "caseId" });

module.exports = {
  User,
  Advocate,
  LegalQuery,
  Bid,
  Case,
  Document,
  Notification,
};
