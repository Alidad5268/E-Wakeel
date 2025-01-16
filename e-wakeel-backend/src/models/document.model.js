const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Document = sequelize.define(
  "Document",
  {
    documentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "documentid",
    },
    documentType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "documenttype",
    },
    filePath: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: "https://cdn.slidesharecdn.com/ss_thumbnails/legaldocumentsonline-1231237333736279-1-thumbnail.jpg?width=640&height=640&fit=bounds",
      field: "filepath",
    },
    caseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "caseid",
      references: {
        model: "Case", // Name of the referenced table
        key: "caseid", // Primary key of the referenced table
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "title",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "description",
    },
    starred: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "starred",
    },
  },
  {
    timestamps: false,
    tableName: "Document",
  }
);

Document.getAllDocuments = async function () {
  try {
    // await sequelize.sync({ alter: true });
    const documents = await Document.findAll();
    return documents;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

Document.createDocument = async function (
  title,
  documentType,
  filePath = "https://cdn.slidesharecdn.com/ss_thumbnails/legaldocumentsonline-1231237333736279-1-thumbnail.jpg?width=640&height=640&fit=bounds",
  description = "",
  caseId = 1,
  starred = false,
) {
  try {
    const newDocument = await Document.create({
      title,
      documentType,
      filePath,
      description,
      caseId,
      starred,
    });
    return newDocument;
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};

Document.toggleStar = async function (id) {
  try {
    const document = await Document.findByPk(id);
    if (!document) {
      throw new Error('Document not found');
    }
    document.starred = !document.starred;
    await document.save();
    return document;
  } catch (error) {
    console.error("Error toggling star status:", error);
    throw error;
  }
};

module.exports = Document;
