import { Sequelize } from "sequelize";
import db from "../db/db.js";

const { DataTypes } = Sequelize;

const dummyModel = db.define("modeldummy", {
  uuid: {
    type: DataTypes.STRING,
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
    defaultValue: "unknown",
  },
}, {freezeTableName: true, timestamps: true});

export default dummyModel;
