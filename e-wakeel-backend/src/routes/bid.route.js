const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bid.controller');

router.get('/', bidController.getAllBids);
router.post('/', bidController.createBid);
router.get('/:id', bidController.getBidById);
router.put('/:id', bidController.updateBid);
router.delete('/:id', bidController.deleteBid);
router.post('/:id/accept', bidController.acceptBid);

module.exports = router;

