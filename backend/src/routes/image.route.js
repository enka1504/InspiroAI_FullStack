import express from 'express';
import {
  generateImageController
  , getImageByIdController, deleteImageByIdController, getAllImagesController
} from '../controllers/image.controller.js'

const router = express.Router();


router.post('/generate', generateImageController);
router.get('/get/:id', getImageByIdController);
router.delete('/delete/:id', deleteImageByIdController);
router.get('/get', getAllImagesController);


export default router;