const caseModel = require('../models/case.model');
const Document = require('../models/document.model');
const path = require('path');
const fs = require('fs');

const getAllCases = async (req, res) => {
  try {
    const cases = await caseModel.getAllCases();
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cases', error });
  }
};

const getCaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const caseData = await caseModel.getCaseById(id);
    if (!caseData) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.status(200).json(caseData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching case', error });
  }
};

const createCase = async (req, res) => {
  try {
    const { title, type, description } = req.body;
    const newCase = await caseModel.create({
      title,
      caseType: type,
      description,
    });

    if (req.file) {
      const { filename, path: filePath } = req.file;
      const document = await Document.create({
        title: filename,
        documentType: path.extname(filename),
        filePath: filePath,
        caseId: newCase.caseId,
      });
    }

    res.status(201).json(newCase);
  } catch (error) {
    console.error('Error creating case:', error);
    res.status(500).json({ message: 'Error creating case', error });
  }
};

const updateCase = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedCase = await caseModel.updateCase(id, title, description);
    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: 'Error updating case', error });
  }
};

const deleteCase = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await caseModel.deleteCase(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting case', error });
  }
};

module.exports = {
  getAllCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
};
