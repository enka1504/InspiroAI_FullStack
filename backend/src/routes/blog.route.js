import express from 'express';

import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} from '../controllers/blog.controller.js';


const router = express.Router();
router.post('/create' , createBlog);
router.get('/getall' , getAllBlogs);
router.get('/get/:id' , getBlogById);
router.put('/update/:id' , updateBlog);
router.delete('/delete/:id' , deleteBlog);

export default router;