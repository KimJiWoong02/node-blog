const express = require('express');
const Post = require('../schemas/post')
const router = express.Router();


// 1. 전체 게시글 목록 조회
//    - 제목, 작성자명, 작성 날짜를 조회하기
//    - 작성 날짜 기준으로 내림차순 정렬하기
router.get("/posts", async (req, res) => {
    const posts = await Post.find().sort({createdAt: -1}).exec();

    res.send({posts});
});

// 2. 게시글 작성
//    - 제목, 작성자명, 작성 내용을 입력하기
router.post("/posts", async (req, res) => {
    const { title, content, author } = req.body;
    const maxPostIdPost = await Post.findOne().sort("-postId").exec(); // -order : 내림차순, order : 오름차순. 
    let postId = 1;

    if (maxPostIdPost) {
        postId = maxPostIdPost.postId + 1;
    }

    const post = new Post({ title, content, author, postId });
    await post.save();

    res.status(200).send({ result: "게시글 작성이 완료되었습니다" });
});
  
// 3. 게시글 조회
//    - 제목, 작성자명, 작성 날짜, 작성 내용을 조회하기
router.get("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const posts = await Post.findOne({ postId });
    return res.render("detailpage", {posts});
});

// 4. 게시글 수정
//    - 제목, 작성자명, 작성 내용 중 원하는 내용을 수정하기
router.patch("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const { title, content, author} = req.body;

    const post = await Post.findOne({ postId }).exec(); // Id로 클릭한 post의 Data를 찾아온다

    post.title = title;
    post.content = content;
    post.author = author;
    await post.save();

    res.status(200).send({result: "게시글 수정이 완료되었습니다"})
});
  
// 5. 게시글 삭제
//    - 원하는 게시물을 삭제하기
router.delete("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
  
    const post = await Post.findOne({ postId }).exec();
    await post.delete();
  
    res.status(200).send({result: "게시글 삭제가 완료되었습니다"});
});
  

module.exports = router;