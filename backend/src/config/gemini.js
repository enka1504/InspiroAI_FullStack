// gemini.js - WORKING FREE SOLUTION
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
import "dotenv/config";

const GEMINI_API_KEY = process.env.GEMINI_API_KEYS;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

export const geminiClient = new GoogleGenerativeAI(GEMINI_API_KEY);
console.log("Gemini client configured");

// ---------------- TEXT GENERATION ----------------
const generateText = async (prompt, modelName = "gemini-2.5-flash") => {
  try {
    const model = geminiClient.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("❌ Gemini Text Error:", error.message);
    throw new Error("Failed to generate text");
  }
};

// ---------------- IMAGE GENERATION (FREE - Pollinations.ai) ----------------
const generateImage = async ({ prompt, style = "realistic", aspectRatio = "1:1" }) => {
  try {
    console.log("🎨 Generating FREE image with Pollinations.ai...");
    
    // Map aspect ratio to dimensions
    const dimensions = {
      "1:1": { width: 1024, height: 1024 },
      "16:9": { width: 1344, height: 768 },
      "9:16": { width: 768, height: 1344 },
      "4:3": { width: 1024, height: 768 },
      "3:4": { width: 768, height: 1024 },
    };

    const { width, height } = dimensions[aspectRatio] || dimensions["1:1"];
    const fullPrompt = `${prompt}, ${style} style`;
    
    // Pollinations.ai - 100% FREE, no API key needed
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=${width}&height=${height}&nologo=true&enhance=true`;
    
    console.log("📡 Fetching image from:", imageUrl);
    
    // Fetch the generated image
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`Pollinations API failed: ${response.status}`);
    }

    // Convert to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    
    console.log("✅ Image generated successfully! Size:", base64.length, "bytes");
    return base64;
    
  } catch (error) {
    console.error("❌ Image Generation Error:", error);
    throw error;
  }
};

export { generateText, generateImage };