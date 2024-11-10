import orderModel from "../model/ordermodel.js";
import productModel from "../model/productmodel.js";
import userModel from "../model/usermodel.js";

export const getOrder = async (req, res) => {
    try {
        const order = await orderModel.findAll({
            where: {
                oderId: req.sessiion.userId
            }
        })
        res.status(200).json({msg: order})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

export const postOrder = async (req, res) => {}

export const editOrder = async (req, res) => {}

export const deleteOrder = async (req, res) => {}