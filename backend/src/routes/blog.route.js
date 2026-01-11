import express from 'express';

import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} from '../controllers/blog.controller.js';

import authMiddleware from '../middlewares/auth.js';


const router = express.Router();
router.post('/create', authMiddleware, createBlog);
router.get('/getall', getAllBlogs);
router.get('/get/:id', getBlogById);
router.put('/update/:id', authMiddleware, updateBlog);
router.delete('/delete/:id', authMiddleware, deleteBlog);

export default router;