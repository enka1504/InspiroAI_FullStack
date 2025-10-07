import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  blogTitle: {
    type: String,
    required: true
  },
  blogTags: {
    type: [String],
    default: [],
    required: true
  },
  blogCateogory: {
    type: String,
    required: true
  },
  blogContent: {
    type: String,
    required: true
  },
  blogImageURL: {
    type: String,
    required: true
  },
  bloglikes: {
    type: Number,
    default: 0,
  },
  blogisPublic: {
    type: Boolean,
    default: false
  },
  blogComments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ]
},
  {
    timestamps: true
  })

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;