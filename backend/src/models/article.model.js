import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: [],
    required: true,
  },
  cateogory: {
    type: String,
    required: true,
  }
},
  {
    timestamps: true
  }
)

const Article = mongoose.model('Article', articleSchema);
export default Article;