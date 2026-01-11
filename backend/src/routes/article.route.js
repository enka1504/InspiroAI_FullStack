import express from 'express'
import { requireAuth } from "@clerk/express";
import { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle  , fetchUserArticles} from '../controllers/article.controller.js';
import authMiddleware from '../middlewares/auth.js';


const router = express.Router();

router.post('/create', authMiddleware, createArticle);
router.get('/getall', getAllArticles);
router.get('/get/:id', getArticleById);
router.put('/update/:id', authMiddleware, updateArticle);
router.delete('/delete/:id', authMiddleware, deleteArticle);
router.get('/user', authMiddleware, fetchUserArticles);

export default router;