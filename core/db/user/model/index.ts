import { model, models, Schema } from "mongoose";
import { IUser } from "../../types";
import jwt from "jsonwebtoken";
import bcryt from "bcrypt";
require("dotenv").config();


const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    image: String,
    password: String,
    location: String,
    ip: String,
    flag: String,
    city: String,
    region: String,
    region_code: String,
    region_type: String,
    country_name: String,
    country_code: String,
    continent_name: String,
    continent_code: String,
    latitude: Number,
    longitude: Number,
    warning:Number,
    active:Boolean
  
  },
  { timestamps: true }
);





userSchema.pre("save",async function(next){
  const user=this;
  if(user.isModified("password")){
      const salt=await  bcryt.genSalt(10)
      const hash=await bcryt.hash(user.password,salt)
      user.password=hash;
  }
  next()
}  )

userSchema.methods.comparepassword= async function(pass:string){
  const user=this;
  const match= await bcryt.compare(pass,user.password)
  return match
}


////////////////gmail verify user////////////////
userSchema.methods.usergmailverify= function(){
  const user=this;
  const userId={_id:user._id.toHexString()}

  const token= jwt.sign(userId,process.env.DB_SECRET??'',{expiresIn:"2d"})
return token
}

const Users = models.users || model("users", userSchema);
export default Users;
