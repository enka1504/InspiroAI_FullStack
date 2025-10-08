import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'
/*configuration of the cloudinary */

const CLOUDINARY_CLOUD_NAME=process.env.CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_KEY=process.env.CLOUDINARY_API_KEYS
const CLOUDINARY_SECRET_KEY=process.env.CLOUDINARY_SECRET_KEYS


cloudinary.config({
   cloud_name: CLOUDINARY_CLOUD_NAME,
   api_key : CLOUDINARY_API_KEY,
   api_secret : CLOUDINARY_SECRET_KEY,
   secure: true
})

console.log("Cloudinary configured");

/*uploading helper for cloudinary */
export const uploadToCloudinary = async (fileBuffer, folder = "uploads") => {
  try {
    if (!fileBuffer) throw new Error("File buffer is required");

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "auto" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(fileBuffer);
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
    };
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error.message);
    throw new Error("Cloudinary upload failed");
  }
};


/*deleting helper for cloudinary */

export const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    console.log(`🗑 Deleted Cloudinary asset: ${publicId}`);
    return result;
  } catch (error) {
    console.error("❌ Cloudinary Delete Error:", error.message);
    throw new Error("Failed to delete Cloudinary asset");
  }
};


export default cloudinary;