import express from 'express';
import {
  generateImageController
  , getImageByIdController, deleteImageByIdController, getAllImagesController
} from '../controllers/image.controller.js'

const router = express.Router();
import authMiddleware from '../middlewares/auth.js';


router.post('/generate', authMiddleware, generateImageController);
router.get('/get/:id', getImageByIdController);
router.delete('/delete/:id', authMiddleware, deleteImageByIdController);
router.get('/get', authMiddleware, getAllImagesController);


export default router;