// routes/test.route.js
import express from "express";
import multer from "multer";
import { uploadToCloudinary } from '../config/cloudinary.js'
import { generateText } from '../config/gemini.js'
import { clerkMiddleware, requireAuth } from "@clerk/express";

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

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await generateText(prompt);
    res.json({
      content: response
    })
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.get("/protected", requireAuth(), (req, res) => {
  console.log("Protected route hit");
  console.log("User ID:", req.auth.userId);
  res.json({
    message: "You are authenticated!",
    userId: req.auth.userId
  });
});


export default router;
