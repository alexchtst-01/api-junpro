import { Sequelize } from "sequelize";
import db from "../db/db.js";
import productModel from "./productmodel.js";
import userModel from "./usermodel.js";

const { DataTypes } = Sequelize;

const orderModel = db.define("order_table", {
  orderId: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  addressdestination: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  totalprice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // nanti yang ke track disni product id yang secara default dibuat sama postgress
  // makanya tipenya integer
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  // nanti yang ke track disni user id yang secara default dibuat sama postgress
  // makanya tipenya integer
  userrecievedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {freezeTableName: true, timestamps: true});

productModel.hasMany(orderModel);
userModel.hasMany(orderModel);

orderModel.belongsTo(productModel, { foreignKey: "productId" });
orderModel.belongsTo(userModel, { foreignKey: "userrecievedId" });

export default orderModel;
