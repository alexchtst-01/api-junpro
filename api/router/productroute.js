import express from "express";
import {
  deleteProduct,
  editProduct,
  getProduct,
  postProduct,
} from "../controller/productcontroller.js";

const productroute = express.Router();

productroute.get("/comment", getProduct);
productroute.patch("/comment", editProduct);
productroute.post("/comment", postProduct);
productroute.delete("/comment", deleteProduct);

export default productroute;