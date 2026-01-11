import Image from '../models/image.model.js';
import { generateImage } from '../config/gemini.js'
import { uploadToCloudinary } from '../config/cloudinary.js'

/**
 * @desc Generate image using Gemini + store in Cloudinary
 * @route POST /api/image/generate
 * @access Private
 */

const generateImageController = async (req, res) => {
  try {
    const { promt, style = "realistic", aspectRatio = "1:1" } = req.body;

    const userId = req.userInfo.id;
    const userName = req.userInfo.userNameFromAccessToken;
    console.log("User Info:", userId, userName);

    if (!promt) {
      return res.status(400).json({
        success: false,
        message: "Promt is required"
      })
    }
    //1.generate image using Gemini
    const base64Image = await generateImage({ promt, style, aspectRatio });
    //2.convert base64 to buffer
    const imageBuffer = Buffer.from(base64Image, 'base64');
    //3.upload image to cloudinary
    const cloudinaryResult = await uploadToCloudinary(
      imageBuffer
    )
    //4.store image info in database
    const newImage = await Image.create({
      userId: userId,
      userName: userName,
      imagePrompt: promt,
      imageURL: cloudinaryResult.url,
      style,
      aspectRatio
    })
    if (newImage) {
      return res.status(201).json({
        success: true,
        message: "Image generated successfully",
        data: newImage
      })
    }
  }
  catch (error) {
    console.log("Error generating image:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const getAllImagesController = async (req, res) => {
  try {
    const images = await Image.find().sort({
      createdAt: -1
    });
    return res.status(200).json({
      success: true,
      message: "Images fetched successfully",
      data: images
    })
  }
  catch (error) {
    console.log("Error fetching images:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const getImageByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Image.findById(id);
    if (image) {
      return res.status(200).json({
        success: true,
        message: "Image fetched successfully",
        data: image
      })
    }
    else {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      })
    }
  }
  catch (error) {
    console.log("Error fetching image by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"

    })
  }
}


const deleteImageByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedImage = await Image.findByIdAndDelete(id);
    if (deletedImage) {
      return res.status(200).json({
        success: true,
        message: "Image deleted successfully",
        data: deletedImage
      })
    }
    else {
      return res.status(404).json({
        success: false,
        message: "Image not found or Not deleted"
      })
    }
  }
  catch (error) {
    console.log("Error deleting image by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export {
  generateImageController
  , getAllImagesController
  , getImageByIdController
  , deleteImageByIdController
}