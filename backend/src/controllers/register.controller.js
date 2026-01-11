import User from '../models/user.model.js';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generate_access_token_secret_key = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
const generate_refresh_token_secret_key = process.env.REFRESH_TOKEN_SECRET_KEY;
const jwt_access_token_expires_in = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
const jwt_refresh_token_expires_in = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;

const generateAccessToken = (user) => {
  const payLoad = {
    id: user._id,
    userNameFromAccessToken: user.userName,
    userEmailFromAccessToken: user.email
  }
  const accessToken = jwt.sign(payLoad, generate_access_token_secret_key, {
    expiresIn: jwt_access_token_expires_in
  })
  return accessToken;
}

const generateRefreshToken = (user) => {
   const payLoad = {
      id : user._id,
      userNameFromRefreshToken : user.userName,
      userEmailFromRefreshToken : user.email
   }
   const refreshToken = jwt.sign(payLoad, generate_refresh_token_secret_key , {
    expiresIn : jwt_refresh_token_expires_in
   })
    return refreshToken;
}


const registerUser = async (req, res) => {
  try {
    const { username, useremail, userpassword } = req.body;
    if (!username || !useremail || !userpassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required . Email , username and password is mandatory"
      })
    }
    const existingUser = await User.findOne({
      $or: [
        { userName: username },
        { email: useremail }
      ]
    })
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with given email or username already exists"
      })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userpassword, salt);

    const newUser = await User.create({
      userName: username,
      email: useremail,
      userPassword: hashedPassword
    })

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: newUser,
        accessToken: accessToken,
        refreshToken: refreshToken
      })
    }
    else {
      return res.status(500).json({
        success: false,
        message: "Failed to register user"
      })
    }
  }
  catch (error) {
    console.log("Error in user registration:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export {
  registerUser
}