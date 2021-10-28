const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { urlencoded, json } = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

//172.31.83.78  ?
mongoose.connect("mongodb://mongo:27017/writing-blog", {
  useNewUrlParser: true,
});


//schema
const CommentSchema = mongoose.Schema({
  body: String,
  name: String,
  photo: String,
  articles: String,
});

const Comment = mongoose.model("comments", CommentSchema);

app.get("/comments", async (req, res) => {
  console.log("we are getting get");
  const comments = await Comment.find({}).lean().exec();
  res.status(200).json(comments);
});

app.post("/comments", (req, res) => {
  console.log(req.body, "req body");
  const comment = new Comment({
    body: req.body.obj.body,
    name: req.body.obj.name,
    photo: req.body.obj.photo,
    articles: req.body.obj.articles,
  });

  comment.save().then((result) => {
    console.log(result, "result");
  });

//   res.status(201).json({
//     message: "handing Post request tp /comments",
//     createdProduct: comment,
//   });

});

//problem with connection 


// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});


