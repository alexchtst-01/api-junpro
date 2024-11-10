import express from "express";
import {
  deletePost,
  editPost,
  getPost,
  postPost,
} from "../controller/postcontroller.js";

const postroute = express.Router();

postroute.get("/post", getPost);
postroute.patch("/post", editPost);
postroute.post("/post", postPost);
postroute.delete("/post", deletePost);

export default postroute;
