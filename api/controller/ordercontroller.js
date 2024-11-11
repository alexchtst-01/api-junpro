import orderModel from "../model/ordermodel.js";
import productModel from "../model/productmodel.js";
import userModel from "../model/usermodel.js";

export const getOrder = async (req, res) => {};

export const postOrder = async (req, res) => {
  try {
    const { addressdestination, totalprice, status } = req.body;
  } catch (error) {
    res.status(500).json({ msg: `terjadi error ${error}` });
  }
};

export const editOrder = async (req, res) => {};

export const deleteOrder = async (req, res) => {};
