import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resumeURL: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  }
)

const Resume = new mongoose.model('Resume', resumeSchema);
export default Resume;