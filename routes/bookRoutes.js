const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { protect, admin } = require('../middlewares/authMiddleware');

// GET all books
router.get('/', protect, bookController.getAllBooks);

// GET book by id
router.get('/:id', protect, bookController.getBookById);

// POST add a new book
router.post('/', protect, admin, bookController.addBook);

// PUT update book by id
router.put('/:id', protect, admin, bookController.updateBook);

// DELETE remove book by id
router.delete('/:id', protect, admin, bookController.deleteBook);

module.exports = router;
