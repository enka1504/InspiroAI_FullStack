import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({

  userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName : {
    type: String,
    required: true,
  },
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