import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import session from "express-session";

import db from "./api/db/db.js";
import dummyroute from "./api/router/dummyroute.js";
import userroute from "./api/router/userroute.js";
import authroute from "./api/router/authroute.js";
import productroute from "./api/router/productroute.js";
import commentroute from "./api/router/commentsroute.js";
import orderroute from "./api/router/orderroute.js";
import postroute from "./api/router/postroute.js";

dotenv.config();

const server = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

server.use(
  session({
    secret: process.env.SECRET_SESS,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

// sync the data base (kalo mau bikin database atau model baru aja)
// (async () => {
//   try {
//     await db.authenticate();
//     console.log("success to authenticate database");
//     await db.sync();
//     console.log("success to synchronize the database");
//   } catch (error) {
//     console.log(`error occur ${error}`);
//   }
// })();

server.use(cors());
server.use(express.json());

server.use(authroute);
server.use(dummyroute);
server.use(userroute);
server.use(productroute);
server.use(orderroute);
server.use(postroute);
server.use(commentroute);

// store.sync();

server.listen(process.env.SERVER_PORT, () => {
  console.log(`server is running in localhost:${process.env.SERVER_PORT}`);
});