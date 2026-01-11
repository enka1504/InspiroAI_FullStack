// gemini.js - WORKING FREE SOLUTION
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
import "dotenv/config";
import sharp from 'sharp';

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

// ---------------- THUMBNAIL GENERATION ----------------

const generateThumbnail = async ({
  topic,
  style,
  colorScheme,
  addText = true,
}) => {
  try {
    console.log("📸 Generating thumbnail...");

    let prompt = "";

    switch (style) {
      case "youtube":
        prompt = `YouTube thumbnail for "${topic}", eye-catching, bold colors, dramatic lighting, high contrast, professional, cinematic, 4K quality, ${colorScheme} color scheme`;
        break;
      case "gaming":
        prompt = `Gaming thumbnail for "${topic}", epic, dynamic action, glowing effects, neon colors, futuristic, intense, ${colorScheme} colors`;
        break;
      case "educational":
        prompt = `Educational thumbnail for "${topic}", clean, professional, friendly, bright, clear, modern design, ${colorScheme} background`;
        break;
      case "vlog":
        prompt = `Vlog thumbnail for "${topic}", lifestyle, candid, vibrant, natural lighting, modern aesthetic, ${colorScheme} tones`;
        break;
      case "podcast":
        prompt = `Podcast cover art for "${topic}", minimalist, professional, microphone, studio setup, ${colorScheme} color palette`;
        break;
      case "tech":
        prompt = `Tech thumbnail for "${topic}", futuristic, sleek, modern, digital, high-tech, ${colorScheme} accents`;
        break;
      case "18plus":
        prompt = `Mature themed thumbnail for "${topic}", extra sexual and intimidating, suggestive explicit, bold lighting, dramatic shadows, cinematic mood, classy adult aesthetic, professional composition, extra  nudity, ${colorScheme} tones`;
        break;
      case "sports":
        prompt = `Sports thumbnail for "${topic}", high energy, intense action moment, dramatic lighting, motion blur, powerful athlete pose, competitive atmosphere, cinematic sports photography, ${colorScheme} color theme`;
        break;

      case "cars":
        prompt = `Car thumbnail for "${topic}", luxury sports car, aggressive angle, glossy reflections, studio lighting, speed and power, ultra-detailed automotive photography, cinematic, ${colorScheme} accents`;
        break;

      case "geopolitics":
        prompt = `Geopolitics thumbnail for "${topic}", serious global affairs, world leaders, tense atmosphere, dramatic shadows, news documentary style, high contrast, authoritative tone, ${colorScheme} color palette`;
        break;

      case "romance":
        prompt = `Romance themed thumbnail for "${topic}", emotional, intimate but tasteful, soft lighting, cinematic love story vibe, warm tones, expressive faces, romantic mood, ${colorScheme} aesthetic`;
        break;

      case "womenpsychology":
        prompt = `Psychology thumbnail for "${topic}", confident woman portrait, thoughtful expression, modern studio lighting, emotional depth, self-awareness theme, empowering and intelligent mood, ${colorScheme} tones`;
        break;

      default:
        prompt = `Thumbnail for "${topic}", professional, eye-catching, ${colorScheme} colors`;
    }

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1280&height=720&nologo=true&enhance=true`;

    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Thumbnail generation failed: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    let imageBuffer = Buffer.from(arrayBuffer);

    // ✅ ADD TEXT OVERLAY IF REQUESTED
    if (addText) {
      imageBuffer = await addTextToThumbnail(imageBuffer, topic, style);
    }

    const base64 = imageBuffer.toString('base64');
    console.log("✅ Thumbnail generated successfully!");
    return base64;

  } catch (error) {
    console.error("❌ Thumbnail Generation Error:", error);
    throw error;
  }
};

// ✅ NEW FUNCTION: Add text overlay to thumbnail
// config/gemini.js - FIXED addTextToThumbnail function
const addTextToThumbnail = async (imageBuffer, text, style) => {
  try {
    const metadata = await sharp(imageBuffer).metadata();
    const { width, height } = metadata;

    // Shorten text smartly
    const MAX_CHARS = 45;
    const displayText =
      text.length > MAX_CHARS ? text.slice(0, MAX_CHARS).toUpperCase() + "…" : text.toUpperCase();

    // Dynamic font size based on image width & text length
    const baseFontSize = Math.floor(width / 18);
    const fontSize =
      displayText.length > 30 ? baseFontSize - 10 : baseFontSize;

    // Style presets

    const styles = {
      youtube: {
        fill: "#FFFFFF",
        stroke: "#000000",
        accent: "#FF0055", // CTA / underline / glow
      },

      gaming: {
        fill: "#00FFEA",
        stroke: "#000000",
        accent: "#00FF00",
      },

      educational: {
        fill: "#FFFFFF",
        stroke: "#000000",
        accent: "#FFD166",
      },

      podcast: {
        fill: "#FFFFFF",
        stroke: "#000000",
        accent: "#FF1493",
      },

      tech: {
        fill: "#00D9FF",
        stroke: "#000000",
        accent: "#0A0E27",
      },

      sports: {
        fill: "#FFFFFF",
        stroke: "#000000",
        accent: "#FF3B3B", // aggressive / adrenaline
      },

      cars: {
        fill: "#FFFFFF",
        stroke: "#000000",
        accent: "#FFB703", // luxury / speed
      },

      geopolitics: {
        fill: "#FFFFFF",
        stroke: "#000000",
        accent: "#D00000", // seriousness / urgency
      },

      romance: {
        fill: "#FFFFFF",
        stroke: "#000000",
        accent: "#FF4D6D", // emotional / warm
      },

      womenpsychology: {
        fill: "#FFFFFF",
        stroke: "#000000",
        accent: "#9B5DE5", // confidence / depth
      },

      fitness: {
        fill: "#FFFFFF",
        stroke: "#000000",
        accent: "#2EC4B6", // health / energy
      },

      business: {
        fill: "#FFFFFF",
        stroke: "#000000",
        accent: "#3A86FF", // trust / authority
      },

      news: {
        fill: "#FFFFFF",
        stroke: "#000000",
        accent: "#E10600", // breaking news red
      },

      "18plus": {
        fill: "#FF2E88",
        stroke: "#000000",
        accent: "#FF0055",
      },

      default: {
        fill: "#FFFFFF",
        stroke: "#000000",
        accent: "#FF0055",
      }
    };


    const theme = styles[style] || styles.youtube;

    const panelHeight = Math.floor(height * 0.28);
    const panelY = height - panelHeight;

    const svg = `
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="panelGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(0,0,0,0.0)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.75)" />
        </linearGradient>

        <filter id="textShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="black" flood-opacity="0.9"/>
        </filter>
      </defs>

      <!-- Bottom gradient panel -->
      <rect
        x="0"
        y="${panelY}"
        width="${width}"
        height="${panelHeight}"
        fill="url(#panelGradient)"
      />

      <!-- Accent bar -->
      <rect
        x="0"
        y="${panelY}"
        width="18"
        height="${panelHeight}"
        fill="${theme.accent}"
      />

      <!-- Main text -->
      <text
        x="${width / 2}"
        y="${panelY + panelHeight / 2 + fontSize / 3}"
        text-anchor="middle"
        font-family="Impact, Bebas Neue, Arial Black, sans-serif"
        font-size="${fontSize}"
        letter-spacing="1.5"
        fill="${theme.fill}"
        stroke="${theme.stroke}"
        stroke-width="4"
        paint-order="stroke"
        filter="url(#textShadow)"
      >
        ${escapeXml(displayText)}
      </text>
    </svg>
    `;

    return await sharp(imageBuffer)
      .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
      .jpeg({ quality: 95 })
      .toBuffer();

  } catch (error) {
    console.error("❌ Thumbnail text overlay failed:", error);
    return imageBuffer;
  }
};


// Helper function to escape XML special characters
const escapeXml = (text) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};
export { generateText, generateImage, generateThumbnail };



