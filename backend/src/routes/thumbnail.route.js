import express from "express";

import {generateThumbnailController , getallThumbnailsController , getThumbnailByIdController , deleteThumbnailController , fetchUserThumbnails} from '../controllers/thumbnail.controller.js';
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post('/generate', authMiddleware, generateThumbnailController);
router.get('/getAll', getallThumbnailsController);
router.get('/get/:id', getThumbnailByIdController);
router.delete('/delete/:id', authMiddleware, deleteThumbnailController);
router.get('/user', authMiddleware, fetchUserThumbnails);

export default router;