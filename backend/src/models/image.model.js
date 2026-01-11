import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName : {
    type: String,
    required: true,
  },
  imagePrompt: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  aspectRatio: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  })

const Image = new mongoose.model('Image', imageSchema);
export default Image;