// routes/test.route.js
import express from "express";
import multer from "multer";
import { uploadToCloudinary } from '../config/cloudinary.js'

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer, "uploads");
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
