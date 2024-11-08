import { Sequelize } from "sequelize";
import db from "../db/db.js";
import userModel from "./usermodel.js";

const { DataTypes } = Sequelize;

const postModel = db.define("post_table", {
  postId: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
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
// nanti yang ke track disni user id yang secara default dibuat sama postgress
// makanya tipenya integer
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {freezeTableName: true, timestamps: true});

userModel.hasMany(postModel);
// nanti yang ke track disni user id yang secara default dibuat sama postgress
postModel.belongsTo(userModel, { foreignKey: "userId" });

export default postModel;
