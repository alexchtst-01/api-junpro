import express from "express";
import { createUser, getUser, getUserbyUUID } from "../controller/usercontroller.js";

const userroute = express.Router();

userroute.get("/user", getUser);
userroute.get("/user/:uuid", getUserbyUUID);
userroute.post("/user", createUser);

export default userroute;
