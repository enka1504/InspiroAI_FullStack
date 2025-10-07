import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videoPrompt: {
    type: String,
    required: true
  },
  videoURL: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  })

const Video = new mongoose.model('Video', videoSchema);
export default Video;