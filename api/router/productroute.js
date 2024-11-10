import express from "express";
import {
  deleteProduct,
  editProduct,
  getProduct,
  postProduct,
} from "../controller/productcontroller.js";
import { verifyRole } from "../midleware/auth.js";

const productroute = express.Router();

productroute.get("/product", verifyRole, getProduct);
productroute.patch("/product/:uuid", verifyRole, editProduct);
productroute.post("/product", verifyRole, postProduct);
productroute.delete("/product/:uuid", verifyRole, deleteProduct);

export default productroute;