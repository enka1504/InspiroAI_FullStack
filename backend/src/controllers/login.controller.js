import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';  


const generate_access_token_secret_key = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
const generate_refresh_token_secret_key = process.env.REFRESH_TOKEN_SECRET_KEY;
const jwt_access_token_expires_in = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
const jwt_refresh_token_expires_in = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;


const generateAccessToken = (user) => {
  const payLoad = {
    id : user._id,
    userNameFromAccessToken : user.userName,
    userEmailFromAccessToken : user.email
  }

  const accessToken = jwt.sign( payLoad, generate_access_token_secret_key , {
    expiresIn : jwt_access_token_expires_in
  })

  return accessToken;
}

const generateRefreshToken = (user) => {
  const payLoad = {
    id : user._id,
    userNameFromRefreshToken : user.userName,
    userEmailFromRefreshToken : user.email
  }
  const refreshToken = jwt.sign( payLoad, generate_refresh_token_secret_key,{
    expiresIn : jwt_refresh_token_expires_in
  })
  return refreshToken;
}

const loginController = async(req, res) => {
  try{
   const {useremail , password} = req.body;

   if( !useremail || !password) {
    return res.status(400).json({
      succes : false,
      message : "All fields are required . Email and password is mandatory"
    })
   }

   const findUser = await User.findOne( {
    email : useremail
   })

   if( !findUser) {
    console.log("User not found");
    return res.status(404).json({
      success : false,
      message : "User with given email does not exists"
    })
   }

   const isCorrectPassword = await bcrypt.compare(password,findUser.userPassword);

   if( !isCorrectPassword) {
    return res.status(401).json({
      success : false,
      message : "Invalid credentials . Please check your  password"
    })
   }

   const accessToken = generateAccessToken(findUser);
   const refreshToken = generateRefreshToken(findUser);
   
   return res.status(200).json( {
    success : true,
    message : "User logged in successfully",
    data : findUser,
    accessToken : accessToken,
    refreshToken : refreshToken
   })
 }
  catch(error){
    console.log("Error in login controller", error);
    return res.status(500).json({
      success: false,
      message : "Internal Server Error"
    })
  }
}

export {
  loginController
}