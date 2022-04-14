const express = require('express');
const Comment = require('../schemas/comment')
const router = express.Router({ mergeParams: true }); // 부모 라우터에서 자식 라우터에게 req.params를 넘겨줄 수 있다.


// 6. 댓글 목록 조회
//     - 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 볼 수 있도록 하기
//     - 작성 날짜 기준으로 내림차순 정렬하기
router.get("/", async (req, res) => {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).sort({createdAt: -1}).exec();

    res.status(200).send({comments});
});

// 7. 댓글 작성
//     - 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
//     - 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가하기
router.post("/", async (req, res) => {
    const { postId } = req.params;
    let { text, author } = req.body;

    if (text === "") return res.send({result: "댓글 내용을 입력해주세요"})

    const maxCommentIdComment = await Comment.findOne().sort("-commentId").exec(); // -order : 내림차순, order : 오름차순.
    let commentId = 1;
    if (maxCommentIdComment) {
        commentId = maxCommentIdComment.commentId + 1;
    }

    // 이름이 없을 시 "익명"으로 처리
    if(author === "") author = "익명"


    const comment = new Comment({ text, author, commentId, postId });
    await comment.save();

    res.status(201).send({ result: "댓글 작성이 완료되었습니다" });
});
  
// 8. 댓글 수정
//     - 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
//     - 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정하기
router.patch("/:commentId", async (req, res) => {
    const { commentId } = req.params;
    let { text, author } = req.body;
    
    if (text === "") return res.send({result: "댓글 내용을 입력해주세요"})

    const comment = await Comment.findOne({ commentId }).exec(); // Id로 클릭한 comment의 Data를 찾아온다

    comment.text = text;

    // 이름 입력 시 이름 변경
    if(author !== "") comment.author = author;
    
    await comment.save();

    res.status(200).send({result: "댓글 수정이 완료되었습니다"})
});
  
// 9. 댓글 삭제
//     - 원하는 댓글을 삭제하기
router.delete("/:commentId", async (req, res) => {
    const { commentId } = req.params;
  
    const comment = await Comment.findOne({ commentId }).exec();
    await comment.delete();
  
    res.status(200).send({result: "댓글 삭제가 완료되었습니다"});
});
  
module.exports = router;