import express from "express";
import {
  getUser,
  getUserbyUUID,
  postUser,
} from "../controller/usercontroller.js";
import { adminOnly } from "../midleware/auth.js";

const userroute = express.Router();

userroute.get("/user", adminOnly, getUser);
userroute.get("/user/:uuid", adminOnly, getUserbyUUID);
userroute.post("/user", postUser);

export default userroute;
