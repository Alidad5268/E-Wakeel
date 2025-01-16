const express = require('express');
const router = express.Router();
const documentController = require('../controllers/document.controller');

router.get('/', documentController.getAllDocuments);
router.get('/:id', documentController.getDocumentById);
router.post('/', documentController.createDocument);
router.put('/:id', documentController.updateDocument);
router.delete('/:id', documentController.deleteDocument);
router.put('/:id/toggle-star', documentController.toggleStar);

module.exports = router;
