import Article from '../models/article.model.js';
import User from '../models/user.model.js';
import Blog from '../models/blog.model.js';
import Images from '../models/image.model.js';
import Thumbnail from '../models/thumbnail.model.js';


const getDashboardStats = async (req, res) => {
  try {

    const userId = req.userInfo.id;
    const userName = req.userInfo.userNameFromAccessToken;
    console.log(`Fetching dashboard stats for user: ${userName} (ID: ${userId})`);

    const [articlesCount, blogsCount, imagesCount, thumbnailsCount] = await Promise.all([
      Article.countDocuments({
        userId: userId
      }),
      Blog.countDocuments({
        userId: userId
      }),
      Images.countDocuments({
        userId: userId
      }),
      Thumbnail.countDocuments({
        userId: userId
      })
    ])

    return res.status(200).json({
      success: true,
      createdBy: userId,
      userName: userName,
      data: {
        noOfArticles: articlesCount,
        noOfBlogs: blogsCount,
        noOfImages: imagesCount,
        noOfThumbnails: thumbnailsCount
      }
    })
  }
  catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

const fetchRecentArticles = async (req, res) => {
  try {
    const userId = req.userInfo.id;
    const userName = req.userInfo.userNameFromAccessToken;

    const recentArticles = await Article.find({
      userId: userId
    }).sort({
      createdAt: -1
    }).limit(3).select('title createdAt content');

    if (!recentArticles) {
      return res.status(404).json({
        success: false,
        message: 'No articles found for this user'
      })
    }

    return res.status(200).json({
      success: true,
      createdBy: userId,
      userName: userName,
      data: recentArticles
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

const fetchRecentBlogs = async (req, res) => {
  try {
    const userId = req.userInfo.id;
    const userName = req.userInfo.userNameFromAccessToken;

    const recentBlogs = await Blog.find({
      userId: userId
    }).sort({
      createdAt: -1
    }).limit(3).select('blogTitle createdAt blogContent');

    if (!recentBlogs) {
      return res.status(404).json({
        success: false,
        message: 'No blogs found for this user'
      })
    }
    return res.status(200).json({
      success: true,
      createdBy: userId,
      userName: userName,
      data: recentBlogs
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

const fetchRecentImages = async (req, res) => {
  try {
    const userId = req.userInfo.id;
    const userName = req.userInfo.userNameFromAccessToken;

    const recentImages = await Images.find({
      userId: userId
    }).sort({
      createdAt: -1
    }).limit(3).select('imagePrompt createdAt imageURL');

    if (!recentImages) {
      return res.status(404).json({
        success: false,
        message: 'No images found for this user'
      })
    }

    return res.status(200).json({
      success: true,
      createdBy: userId,
      userName: userName,
      data: recentImages
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

const fetchRecentThumbnails = async (req, res) => {
  try {
    const userId = req.userInfo.id;
    const userName = req.userInfo.userNameFromAccessToken;

    const recentThumbnails = await Thumbnail.find({
      userId: userId
    }).sort({
      createdAt: -1
    }).limit(3).select('topic createdAt thumbnailUrl');

    if(!recentThumbnails){
      return res.status(404).json({
        success : false,
        message : 'No thumbnails found for this user'
      })
    }
  
    return res.status(200).json({
      success : true,
      createdBy : userId,
      userName : userName,
      data : recentThumbnails
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success : false,
      message : 'Internal Server Error'
    })
  }
}

export { getDashboardStats  , fetchRecentArticles, fetchRecentBlogs, fetchRecentImages, fetchRecentThumbnails };