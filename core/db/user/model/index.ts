import { Connection, model, models, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcryt from "bcrypt";
import { IUser, UserModel } from "@/core/db/types";
require("dotenv").config();




const DEFAULT_TOKEN_SECRET="adscxhjsahd21k43we8sfdogkdlk"
const DB_SCHEMA_NAME = "users";
const userSchema: Schema<IUser> = new Schema(
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
    warning: Number,
    active: Boolean,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcryt.genSalt(10);
    const hash = await bcryt.hash(user.password, salt);
    user.password = hash;
  }
  next();
});
const JWT_SECRET=process.env.DB_SECRET?? DEFAULT_TOKEN_SECRET

userSchema.methods.comparePassword = async function (pass: string) {
  const user = this;
  return await bcryt.compare(pass, user.password);
};

userSchema.methods.generateToken = function () {
  const user = this;
  const userId = { _id: user._id.toHexString() };
  return jwt.sign(userId, JWT_SECRET, { expiresIn: "1d" });
};

userSchema.methods.userGmailVerify = function () {
  const user = this;
  const userId = { _id: user._id.toHexString() };
  return jwt.sign(userId, JWT_SECRET, { expiresIn: "2d" });
};


export default function userModel (connection: Connection) {
  return connection.model<IUser, UserModel>(DB_SCHEMA_NAME, userSchema);
}
