import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';
import { modelNames } from 'mongoose';

const GEMINI_API_KEY = process.env.GEMINI_API_KEYS;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

export const geminiClient = new GoogleGenerativeAI(GEMINI_API_KEY);
console.log("Gemini client configured");

export const generateText = async (prompt, modelName = "gemini-2.0-flash") => {
  try {
    const model = geminiClient.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("Generated text:", text);
    return text;
  } catch (error) {
    console.error("❌ Gemini Generation Error:", error.message);
    throw new Error("Failed to generate content from Gemini API");
  }
}
export default geminiClient;