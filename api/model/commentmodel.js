import { Sequelize } from "sequelize";
import db from "../db/db.js";

import userModel from "./usermodel.js";
import postModel from "./postmodel.js";

const { DataTypes } = Sequelize;

const commentModel = db.define("comment_table", {
  comentId: {
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
  // nanti yang ke track disni user id yang secara default dibuat sama postgress
  // makanya tipenya integer
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  // nanti yang ke track disni post id yang secara default dibuat sama postgress
  // makanya tipenya integer
  postId: {
    type: DataTypes.INTEGER,
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
