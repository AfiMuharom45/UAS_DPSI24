const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { protect, admin } = require('../middlewares/authMiddleware');

// GET all transactions
router.get('/', protect, transactionController.getAllTransactions);

// GET transaction by id
router.get('/:id', protect, transactionController.getTransactionById);

// POST add a new transaction
router.post('/', protect, transactionController.addTransaction);

// PUT update transaction by id for admin
router.put('/:id', protect, admin, transactionController.updateTransaction);

// DELETE remove transaction by id fro admin 
router.delete('/:id', protect, admin, transactionController.deleteTransaction);

module.exports = router;
