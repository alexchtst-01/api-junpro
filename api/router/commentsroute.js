import express from "express";
import {
  deleteComments,
  editComments,
  getComments,
  postComments,
} from "../controller/commentscontroller.js";

const commentroute = express.Router();

commentroute.get("/comment", getComments);
commentroute.patch("/comment", editComments);
commentroute.post("/comment", postComments);
commentroute.delete("/comment", deleteComments);

export default commentroute;
