import mongoose from "mongoose";

const thumbnailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  style: {
    type: String,
    default: 'youtube'
  },
  colorScheme: {
    type: String,
    enum: ['vibrant', 'dark', 'light', 'neon', 'pastel', 'monochrome'],
    default: 'vibrant'
  },
  thumbnailUrl: {
    type: String,
    required: true
  },

}, {
  timestamps: true
});

const Thumbnail = mongoose.model('Thumbanil', thumbnailSchema);
export default Thumbnail;