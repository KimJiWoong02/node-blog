const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
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
    type: String
  },
  author: {
    type: String,
    required: true, 
  },
}, { timestamps: true });

module.exports = mongoose.model("Command", commentSchema);

