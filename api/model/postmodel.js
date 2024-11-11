import { Sequelize } from "sequelize";
import db from "../db/db.js";
import userModel from "./usermodel.js";

const { DataTypes } = Sequelize;

const postModel = db.define("post_table", {
  postId: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "--",
    validate: {
      notEmpty: true,
    },
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {freezeTableName: true, timestamps: true});

userModel.hasMany(postModel);
postModel.belongsTo(userModel, { foreignKey: "userId" });

export default postModel;
