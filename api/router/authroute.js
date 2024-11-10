import express from "express";
import { Login, Logout } from "../controller/authcontroller.js";

const authroute = express.Router();

authroute.post('/login', Login);
authroute.delete('/logout', Logout);

export default authroute;