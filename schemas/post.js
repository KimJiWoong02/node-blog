const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);