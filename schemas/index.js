const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/blog", { ignoreUndefined: true })
    .catch(err => console.log(err));
};
// connect 함수 두번째 인자에는 ignoreUndefined 라는 옵션을 넘길 수 있는데
// 이 옵션을 넘겨야 아래 필터링 예시에서 작성한 코드처럼 category를 넘기지 않았을 경우
// 문제 없이 모든 데이터를 불러올 수 있도록 돕는다.
// http://localhost:3000/api/goods?category=food   (category === undefined 인 상황을 대비!)

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
