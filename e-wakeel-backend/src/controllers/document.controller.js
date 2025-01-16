const documentModel = require("../models/document.model");

const getAllDocuments = async (req, res) => {
  try {
    const documents = await documentModel.getAllDocuments();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents", error });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await documentModel.getDocumentById(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: "Error fetching document", error });
  }
};

const createDocument = async (req, res) => {
  try {
    const { title, type, imgPath } = req.body;
    const newDocument = await documentModel.createDocument(title, type, imgPath);
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ message: "Error creating document", error });
  }
};

const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedDocument = await documentModel.updateDocument(
      id,
      title,
      content
    );
    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(500).json({ message: "Error updating document", error });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await documentModel.deleteDocument(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error deleting document", error });
  }
};

const toggleStar = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDocument = await documentModel.toggleStar(id);
    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(500).json({ message: "Error toggling star status", error });
  }
};

module.exports = {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  toggleStar,
};
