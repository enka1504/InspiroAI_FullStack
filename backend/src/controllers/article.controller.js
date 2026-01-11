import Article from "../models/article.model.js";
import User from "../models/user.model.js"
import { geminiClient, generateText } from "../config/gemini.js";
import { use } from "react";



/**
 * @desc    Create AI-generated article using Gemini
 * @route   POST /api/articles
 * @access  Private
 */

const createArticle = async (req, res) => {
  try {
    const { title, tags = [], category, tone = "Informative", length = "medium" } = req.body;
    const userId = req.userInfo.id;
    const userName = req.userInfo.userNameFromAccessToken;

    console.log("Username  in createArticle:", req.userInfo.userNameFromAccessToken);

    if (!title || !category) {
      return res.status(400).json({
        message: "Title and Category are required",
        success: false
      })
    }



    /*GEMINI PROMPT CREATION*/
    /* 🔮 Gemini Prompt */
    const prompt = `
Write a ${length}, ${tone} article titled "${title}".

Category: ${category}
Tags: ${tags.join(", ") || "N/A"}

Guidelines:
- Use proper headings and subheadings
- Keep paragraphs concise
- Maintain a professional blog tone
- Ensure originality and clarity
`;

    const generateContent = await generateText(prompt);
    if (!generateContent) {
      return res.status(500).json({
        message: " AI Failed to generate article content",
        success: false
      })
    }



    const newArticle = await Article.create({
      userId: userId,
      userName: userName,
      title,
      content: generateContent,
      tags,
      cateogory: category
    })

    if (newArticle) {
      return res.status(201).json({
        message: "Article created successfully",
        success: true,
        article: newArticle
      })
    }
  }
  catch (error) {
    console.log("Error creating article", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    })
  }
}

/**
 * @desc    Get all articles
 * @route   GET /api/articles
 * @access  Public
 */

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    if (articles) {
      return res.status(200).json({
        success: true,
        articles: articles
      })
    }
  }
  catch (error) {
    console.log("Error fetching articles", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

/**
 * @desc    Get single article by ID
 * @route   GET /api/articles/:id
 * @access  Public
 */

const getArticleById = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({
        succss: false,
        message: "Article not found"
      })
    }
    return res.status(200).json({
      success: true,
      article: article
    })
  }
  catch (error) {
    console.log("Error fetching article by ID", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

/**
 * @desc    Update article (title, tags, category only)
 * @route   PUT /api/articles/:id
 * @access  Private (Owner only)
 */

const updateArticle = async (req, res) => {
  try {
    const { title, tags, category } = req.body;
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found"
      })
    }
    /*
    if (article.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this article"
      })
    }
      */
    article.title = title || article.title;
    article.tags = tags || article.tags;
    article.cateogory = category || article.cateogory;

    const updatedArticle = await article.save();
    return res.status(200).json({
      success: true,
      message: "Article updated successfully",
      article: updatedArticle
    })
  }
  catch (error) {
    console.log("Error updating article", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

/**
 * @desc    Delete article
 * @route   DELETE /api/articles/:id
 * @access  Private (Owner only)
 */

const deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found"
      })
    }
    /*
    if (article.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this article"
      })
    }
    */
    const deletedArticle = await Article.findByIdAndDelete(articleId);
    return res.status(200).json({
      success: true,
      message: "Article deleted successfully",
      article: deletedArticle
    })
  }

  catch (error) {
    console.log("Error deleting article", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const fetchUserArticles = async (req, res) => {
  try {
    const userId = req.userInfo.id;

    const userArticles = await Article.find({
      userId: userId
    }).sort({ createdAt: -1 });

    if (!userArticles) {
      return res.status(404).json({
        success: false,
        message: "No articles found for this user"
      })
    }
    return res.status(200).json({
      success: true,
      articles: userArticles
    })
  }
  catch (error) {
    console.log("Error fetching user articles", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}


export {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  fetchUserArticles
}