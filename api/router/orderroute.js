import express from "express";
import {
  deleteOrder,
  editOrder,
  getOrder,
  postOrder,
} from "../controller/ordercontroller.js";

const orderroute = express.Router();

orderroute.get("/order", getOrder);
orderroute.patch("/order", editOrder);
orderroute.post("/order", postOrder);
orderroute.delete("/order", deleteOrder);

export default orderroute;
