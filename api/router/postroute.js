import express from "express";
import {
  deletePost,
  editPost,
  getPost,
  postPost,
} from "../controller/postcontroller.js";
import { verifyRole } from "../midleware/auth.js";

const postroute = express.Router();

postroute.get("/post", verifyRole, getPost);
postroute.post("/post", verifyRole, postPost);
postroute.patch("/post/:uuid", verifyRole, editPost);
postroute.delete("/post/:uuid", verifyRole, deletePost);

export default postroute;
