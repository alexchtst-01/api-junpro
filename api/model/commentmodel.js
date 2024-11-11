import { Sequelize } from "sequelize";
import db from "../db/db.js";

import userModel from "./usermodel.js";
import postModel from "./postmodel.js";

const { DataTypes } = Sequelize;

const commentModel = db.define("comment_table", {
  comentId: {
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "--",
    validate: {
      notEmpty: true,
    },
  },
  senderId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  postId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {freezeTableName: true, timestamps: true});

postModel.hasMany(commentModel);
userModel.hasMany(commentModel);

commentModel.belongsTo(userModel, { foreignKey: "senderId" });
commentModel.belongsTo(postModel, { foreignKey: "postId" });

export default commentModel;
