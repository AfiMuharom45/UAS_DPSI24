const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, admin } = require('../middlewares/authMiddleware');

// GET all categories
router.get('/', protect, categoryController.getAllCategories);

// GET category by id
router.get('/:id', protect, categoryController.getCategoryById);

// POST add a new category
router.post('/', protect, admin, categoryController.addCategory);

// PUT update category by id
router.put('/:id', protect, admin, categoryController.updateCategory);

// DELETE remove category by id
router.delete('/:id', protect, admin, categoryController.deleteCategory);

module.exports = router;
