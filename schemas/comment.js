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
    type: String,
    required: true
  },
  author: {
    type: String,
    
  },
}, { timestamps: true });

module.exports = mongoose.model("Command", commentSchema);

