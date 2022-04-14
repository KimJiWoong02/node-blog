// const mongoose = require("mongoose");
//import mongoose from "mongoose";
import { Schema, model } from "mongoose";

interface IPost {
  postId: number;
  title: String;
  content: String;
  author: String;
}

const postSchema = new Schema<IPost>({
  postId: {
    type: Number,
    required: true, // 필수 값
    unique: true // 고유값 설정 (중복X)
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String
  },
  author: {
    type: String
  },
}, { timestamps: true });

//module.exports = model<IPost>("Post", postSchema);
export default model<IPost>("Post", postSchema);