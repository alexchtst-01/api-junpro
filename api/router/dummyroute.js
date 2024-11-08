import express from "express";
import dummyModel from "../model/dummymodel.js";
import userModel from "../model/usermodel.js";
import commentModel from "../model/commentmodel.js";
import postModel from "../model/postmodel.js";
import orderModel from "../model/usermodel.js";
import productModel from "../model/productmodel.js";

const dummyroute = express.Router();

const getDummyData = async (req, res) => {
  try {
    const data = await dummyModel.findAll();
    const user = await userModel.findAll();
    const product = await productModel.findAll();
    const order = await orderModel.findAll();
    const post = await postModel.findAll();
    const comment = await commentModel.findAll();
    res.status(200).json({ data, user, comment, post, order, product });
  } catch (error) {
    res.status(500).json({ msg: `error happened ${error}` });
  }
};

dummyroute.get("/", getDummyData);

export default dummyroute;
