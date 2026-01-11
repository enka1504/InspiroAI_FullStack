import 'dotenv/config';
import jwt from 'jsonwebtoken';

const jwt_secret_key = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

const authMiddleware = (req,res,next) => {
  try{
    const headers = req.headers["authorization"];
    console.log("Headers in auth middleware ", headers);

    if( !headers){
      return res.status(401).json({
        success : false,
        message : "Authorization header is missing"
      })
    }
  
    const token = headers.split(" ")[1];
    console.log("Token in auth middleware ", token);

    if( !token){
      return res.status(401).json({
        success : false,
        message : "Token is missing"
      })
    }

    const decodedToken = jwt.verify(token,jwt_secret_key);
    console.log("Decoded token in auth middleware ", decodedToken);

    req.userInfo = decodedToken;
    next();
  }
  catch(error){
    console.log("Error in auth middleware ", error);
    return res.status(500).json({
      success : false,
      message : "Internal server error in auth middleware"
    })
  }
}

export default authMiddleware;