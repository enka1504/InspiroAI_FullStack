import express from 'express'

import { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle } from '../controllers/article.controller.js';


const router = express.Router();

router.post('/create', createArticle);
router.get('/getall', getAllArticles);
router.get('/get/:id', getArticleById);
router.put('/update/:id',  updateArticle);
router.delete('/delete/:id',  deleteArticle);

export default router;