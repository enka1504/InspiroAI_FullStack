import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName : {
      type : String,
      required : true,
      unique : true,
      trim : true,
    },
    email : {
      type : String,
      required : true ,
      unique : true,
      trim : true,
    },
    userPassword : {
      type : String ,
      required : true,
      trim : true,
    }
  }
);

const User = mongoose.model("User", userSchema);
export default User;
