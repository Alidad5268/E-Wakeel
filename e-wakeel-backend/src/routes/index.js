const express = require("express");
const router = express.Router();

// Import individual route files
const caseRoutes = require("./case.route");
const documentRoutes = require("./document.route");
// const userRoutes = require('./userRoutes');
// const advocateRoutes = require('./advocateRoutes');
// const legalQueryRoutes = require('./legalQueryRoutes');
const bidRoutes = require("./bid.route");
// const notificationRoutes = require('./notificationRoutes');

// Use routes
router.use("/cases", caseRoutes);
router.use("/documents", documentRoutes);
// router.use('/users', userRoutes);
// router.use('/advocates', advocateRoutes);
// router.use('/legal-queries', legalQueryRoutes);
router.use("/bids", bidRoutes);
// router.use('/notifications', notificationRoutes);

module.exports = router;
