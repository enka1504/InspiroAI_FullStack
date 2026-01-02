import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
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
  
},
  {
    timestamps: true
  })

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;