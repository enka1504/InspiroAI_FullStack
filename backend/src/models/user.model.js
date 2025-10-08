import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  userEmail: {
    type: String,
    required: true,
    
    unique: true
  },
  userPlan: {
    type: String,
    enum: ['Free', 'Paid'],
    default: 'Free'
  },
  usages: {
    generatedArticles: {
      type: Number,
      default: 0
    },
    generatedBlogs: {
      type: Number,
      default: 0
    },
    generatedImages: {
      type: Number,
      default: 0
    },
    generatedVideos: {
      type: Number,
      default: 0
    },

  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema);
export default User;