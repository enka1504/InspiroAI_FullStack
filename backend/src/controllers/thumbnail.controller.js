import Thumbnail from "../models/thumbnail.model.js";
import { generateThumbnail } from '../config/gemini.js';
import { uploadToCloudinary } from '../config/cloudinary.js'

/**
 * @desc Generate thumbnail
 * @route POST /api/thumbnail/generate
 * @access Private/Public
 */

const generateThumbnailController = async (req, res) => {
  try {
    const { topic, style, colorScheme, addText = true } = req.body;

    const userId = req.userInfo.id;
    const userName = req.userInfo.userNameFromAccessToken;
    console.log(`👤 Request by User: ${userName} (ID: ${userId})`);


    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required"
      })
    }
    console.log("📝 Thumbnail Generation Request:", { topic, style, colorScheme, addText });

    //1.Generate Thumbnail using Gemini config

    const base64Image = await generateThumbnail({ topic, style, colorScheme, addText });

    //2.Convert base64 to buffer 
    const bufferThumbnail = Buffer.from(base64Image, 'base64');

    //3. Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(bufferThumbnail, 'thumbnails');

    console.log("☁️ Uploaded to Cloudinary:", uploadResult.url);

    //4.save to MongoDB

    const newThumbnail = await Thumbnail.create({
      userId: userId, 
      userName: userName,
      topic,
      style,
      colorScheme,
      thumbnailUrl: uploadResult.url
    })

    if (newThumbnail) {
      return res.status(201).json({
        success: true,
        message: "Thumbnail Generated Successfully",
        data: newThumbnail
      })
    }
    else {
      return res.status(400).json({
        success: false,
        message: "Failed to generate thumbnail"
      })
    }
  }
  catch (error) {
    console.log("❌ Generate Thumbnail Controller Error:", error);
    return res.status(500).jso({
      success: false,
      message: "Server Error in Generating Thumbnail"
    })
  }
}

const getallThumbnailsController = async (req, res) => {
  try {
    const thumbnails = await Thumbnail.find().sort({
      createdAt: -1
    })
    if (thumbnails) {
      return res.status(200).json({
        success: true,
        message: "Thumbnails fetched successfully",
        data: thumbnails
      })
    }
    else {
      return res.status(404).json({
        success: false,
        message: "No Thumbnails Found"
      })
    }
  }
  catch (error) {
    console.log("❌ Get All Thumbnails Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error in Fetching Thumbnails"
    })
  }
}

const getThumbnailByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const findThumbnail = await Thumbnail.findById(id);
    if (findThumbnail) {
      console.log("🔍 Found Thumbnail:", findThumbnail);
      return res.status(200).json({
        success: false,
        message: "Thumbnail fetched successfully",
        data: findThumbnail
      })
    }
    else {
      return res.status(404).json({
        success: false,
        message: "Thumbnail Not Found"
      })
    }
  }
  catch (error) {
    console.log("❌ Get Thumbnail By ID Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error in Fetching Thumbnail by ID"
    })
  }
}

const deleteThumbnailController = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedThumbnail = await Thumbnail.findByIdAndDelete(id);
    if(deletedThumbnail){
      return res.status(200).json({
        success : true,
        message : "Thumbnail Deleted Successfully",
        data : deletedThumbnail
      })
    }
    else {
      return res.status(404).json({
        success : false,
        message : "Thumbnail Not Found"
      })
    }
  }
  catch(error){
    console.log("❌ Delete Thumbnail Controller Error:", error);
    return res.status(500).json({
      success : false,
      message : "Server Error in Deleting Thumbnail"
    })
  }
}

const fetchUserThumbnails = async (req, res) => {
  try {
    const userId = req.userInfo.id;

    const userThumbnails = await Thumbnail.find({
      userId: userId
    }).sort({ createdAt: -1 });

    if (!userThumbnails) {
      return res.status(404).json({
        success: false,
        message: "No Thumbnails found for this user"
      })
    }
    return res.status(200).json({
      success: true,
      articles: userThumbnails
    })
  }
  catch (error) {
    console.log("Error fetching user articles", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export { generateThumbnailController, getallThumbnailsController , getThumbnailByIdController , deleteThumbnailController , fetchUserThumbnails };

