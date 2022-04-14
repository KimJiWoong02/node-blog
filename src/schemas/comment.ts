// const mongoose = require("mongoose");
//import mongoose from "mongoose";
import { Schema, model } from "mongoose";

interface IComment {
  commentId: number;
  postId: number;
  text: String;
  author: String;
}

const commentSchema = new Schema<IComment>({
  commentId: {
    type: Number,
    required: true, 
    unique: true 
  },
  postId: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    
  },
}, { timestamps: true });

//module.exports = model<IComment>("Comment", commentSchema);
export default model<IComment>("Comment", commentSchema);;

