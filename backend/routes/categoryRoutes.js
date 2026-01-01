import express from 'express';
const router = express.Router();
import {
  getCategories,
  getAdminCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Public routes
router.route('/').get(getCategories);

// Admin routes
router.route('/admin').get(protect, admin, getAdminCategories);
router.route('/').post(protect, admin, createCategory);
router.route('/:id')
  .get(getCategoryById)
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

export default router;
