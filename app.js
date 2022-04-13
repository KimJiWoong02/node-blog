const express = require('express');
const connect = require('./schemas');
const ejs = require("ejs");
const cors = require("cors");
const app = express();
const port = 3000;

connect();

const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");

const requestMiddleware = (req, res, next) => {
  console.log('Request URL:', req.originalUrl, ' - ', new Date());
  next();
};



app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cors());
app.use(requestMiddleware);

app.use("/api", [postRouter, commentRouter]);


app.get('/', (req, res) => {
    return res.render("mainpage"); 
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});