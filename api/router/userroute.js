import express from "express";
import { createUser, getUser, getUserbyUUID } from "../controller/usercontroller.js";
import { adminOnly } from "../midleware/auth.js";

const userroute = express.Router();

userroute.get("/user", adminOnly, getUser);
userroute.get("/user/:uuid", adminOnly, getUserbyUUID);
userroute.post("/user", createUser);

export default userroute;
