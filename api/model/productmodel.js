import { Sequelize } from "sequelize";
import db from "../db/db.js";
import userModel from "./usermodel.js";

const { DataTypes } = Sequelize;

const productModel = db.define("product_table", {
  productId: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {freezeTableName: true, timestamps: true});

userModel.hasMany(productModel);
productModel.belongsTo(userModel, { foreignKey: "userownerId" });

export default productModel;
