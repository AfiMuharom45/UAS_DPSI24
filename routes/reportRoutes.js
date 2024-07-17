const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Generate transaction report and download as PDF
router.get('/transaction-report', reportController.generateTransactionReport);

module.exports = router;
