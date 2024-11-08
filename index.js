import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./api/db/db.js";
import dummyroute from "./api/router/dummyroute.js";

dotenv.config();

const server = express();

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

server.use(dummyroute);

server.listen(5000, () => {
  console.log("server is running");
});
