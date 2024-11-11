import productModel from "../model/productmodel.js";
import userModel from "../model/usermodel.js";
import { Op } from "sequelize";

// dah bener
export const getProduct = async (req, res) => {
  try {
    if (req.role === "admin") {
      const product = await productModel.findAll({
        attributes: ["productId", "name", "price"],
        include: [
          {
            model: userModel,
            attributes: ["userId", "username"],
          },
        ],
      });
      res.status(200).json(product);
    } else {
      const product = await productModel.findAll({
        where: {
          userownerId: req.userId,
        },
        attributes: ["productId", "name", "price"],
        include: [
          {
            model: userModel,
            attributes: ["userId", "username"],
          },
        ],
      });
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ msg: `terjadi error ${error}` });
  }
};

// dah bener
export const postProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    if (!req.userId) return res.status(404).json({ msg: "anda belom login" });
    await productModel.create({
      name: name,
      price: price,
      userownerId: req.userId,
    });
    return res.status(200).json({ msg: "berhasil menambahkan product" });
  } catch (error) {
    res.status(500).json({ msg: `terjadi error ${error}` });
  }
};

// dah bener
export const editProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const product = await productModel.findOne({
      where: {
        productId: req.params.uuid,
      },
    });
    if (!product)
      return res.status(404).json({ msg: "product tidak ditemukan" });
    if (req.role === "admin") {
      await productModel.update(
        { name, price },
        {
          where: {
            productId: product.productId,
          },
        }
      );
      return res.status(200).json({ msg: "product berhasil di update" });
    } else {
      if (req.userId !== product.userownerId)
        return res
          .status(403)
          .json({ msg: "anda tidak boleh mengakses yang bukan product anda" });
      await productModel.update(
        { name, price },
        {
          where: {
            [Op.and]: [
              { productId: product.productId },
              { userownerId: req.userId },
            ],
          },
        }
      );
      return res.status(200).json({ msg: "product berhasil di update" });
    }
  } catch (error) {
    res.status(500).json({ msg: `terjadi error ${error}` });
  }
};

// dah aman
export const deleteProduct = async (req, res) => {
  try {
    // Locate the product
    const product = await productModel.findOne({
      where: {
        productId: req.params.uuid,
      },
    });

    if (!product) {
      console.log("Product not found.");
      return res.status(404).json({ msg: "Product tidak ditemukan" });
    }

    // Check if user is admin
    if (req.role === "admin") {
      await productModel.destroy({
        where: {
          productId: product.productId,
        },
      });
      res.status(200).json({ msg: "data berhasil dihapus" });
    } else {
      if (req.userId !== product.userownerId)
        return res
          .status(403)
          .json({ msg: "anda tidak boleh mengakses yang bukan product anda" });
      await productModel.destroy({
        where: {
          productId: product.productId,
        },
      });
      res.status(200).json({ msg: "data berhasil dihapus" });
    }
  } catch (error) {
    res.status(500).json({ msg: `terjadi error ${error}` });
  }
};
