import express from 'express';
import {
  getDashboardStats,
  fetchRecentArticles,
  fetchRecentImages,
  fetchRecentBlogs,
  fetchRecentThumbnails
} from '../controllers/dashboard.controller.js';
import authMiddleware from '../middlewares/auth.js';


const router = express.Router();

router.get('/stats', authMiddleware, getDashboardStats);
router.get('/recentArticles', authMiddleware, fetchRecentArticles);
router.get('/recentBlogs', authMiddleware, fetchRecentBlogs);
router.get('/recentImages', authMiddleware, fetchRecentImages);
router.get('/recentThumbnails', authMiddleware, fetchRecentThumbnails);

export default router;