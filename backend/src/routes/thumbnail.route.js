import express from "express";

import {generateThumbnailController , getallThumbnailsController , getThumbnailByIdController , deleteThumbnailController} from '../controllers/thumbnail.controller.js';

const router = express.Router();

router.post('/generate', generateThumbnailController);
router.get('/getAll', getallThumbnailsController);
router.get('/get/:id', getThumbnailByIdController);
router.delete('/delete/:id', deleteThumbnailController);

export default router;