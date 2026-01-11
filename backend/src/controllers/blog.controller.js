import Blog from '../models/blog.model.js';
import { generateText } from "../config/gemini.js";
import 'dotenv/config';

/**
 * @desc    Create AI-generated blog
 * @route   POST /api/blog/create
 * @access  Private
 */


const createBlog = async (req, res) => {
  try {
    const { title, tags = [], content, category, tone = "informative", length = "medium" } = req.body;

    const userId = req.userInfo.id;
    const userName = req.userInfo.userNameFromAccessToken;
    console.log("UserID in createBlog:", userId);
    console.log("Username  in createBlog:", userName);

    if (!title || !category ) {
      return res.status(400).json({
        success: false,
        message: "Title, Category and Content are required"
      })
    }

    const prompt = `
Write a ${length}, ${tone} blog post titled "${title}".

Category: ${category}
Tags: ${tags.join(", ") || "N/A"}

Guidelines:
- Use engaging headings
- Write in blog-style tone
- Add examples where relevant
- Keep content original and clear
`;

    const generatedContent = await generateText(prompt);
    if (!generatedContent) {
      return res.status(400).json({
        success: false,
        message: "Failed to generate blog content"
      })
    }
    const newBlog = await Blog.create({
      userId: userId,
      userName: userName, 
      blogTitle: title,
      blogTags: tags,
      blogCateogory: category,
      blogContent: generatedContent
    })

    if (newBlog) {
      return res.status(201).json({
        success: true,
        messgae: "Blog created successfully",
        newBlog: newBlog
      })
    }
  }
  catch (error) {
    console.log("Error creating blog", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

/**
 * @desc    Get all blogs
 * @route   GET /api/blog/getall
 * @access  Public
 */


const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find().sort({
      createdAt: -1
    })
    if (allBlogs) {
      return res.status(200).json({
        success: true,
        message: "Blogs fetched successfully",
        blogs: allBlogs
      })
    }
    else {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      })
    }
  }
  catch (error) {
    console.log("Error fetching blogs", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

/**
 * @desc    Get blogs By Id
 * @route   GET /api/blog/:id
 * @access  Public
 */


const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (blog) {
      return res.status(200).json({
        success: true,
        message: "Blog fetched successfully",
        blog: blog
      })
    }
    else {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      })
    }
  }
  catch (error) {
    console.log("Error fetching blog by ID", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

/**
 * @desc   Update blog by Id
 * @route   PUT /api/blog/update/:id
 * @access  Private
 */


const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content, tags = [], category } = req.body;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      })
    }
    blog.blogTitle = title || blog.blogTitle;
    blog.blogCateogory = category || blog.blogCateogory;
    blog.blogTags = tags.length > 0 ? tags : blogs.blogTags;
    blog.blogContent = content || blog.blogContent;

    const updatedBlog = await blog.save();
    if (updatedBlog) {
      return res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        blog: updatedBlog
      })
    }
    else {
      return res.status(500).json({
        success: false,
        message: "Failed to update the blog"
      })
    }
  }
  catch (error) {
    console.log("Error in updating the blog ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}


/**
 * @desc   Delete blog by Id
 * @route   PUT /api/blog/delete/:id
 * @access  Private 
 */


const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (deletedBlog) {
      return res.status(200).json({
        success: true,
        message: "Blog deleted successfully"
      })
    }
    else {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      })
    }
  }
  catch (error) {
    console.log("Error in deleting the blog ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}


export {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
}