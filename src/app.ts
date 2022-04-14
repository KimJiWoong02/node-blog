import express, { Request, Response, NextFunction } from 'express';
import connect from './schemas';
import cors  from 'cors';
const app = express();
const port = 3000;

connect();

import postRouter from "./routes/post";
import commentRouter from "./routes/comment";

const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Request URL:', req.originalUrl, ' - ', new Date());
  next();
};

app.set('view engine', 'ejs');
app.set("views", process.cwd() + "/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cors());
app.use(requestMiddleware);


//app.use("/api", [postRouter, commentRouter]);
app.use("/api/posts", postRouter)
app.use("/api/posts/:postId/comments", commentRouter)


app.get('/', (req, res) => {
    return res.render("mainpage"); 
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});