const express = require("express");
const server = express();
const dotenv = require("dotenv");

//
dotenv.config();
//
const app = require("./app");
server.use("/", app);
require("./Connection/Configure");

server.listen(8000);
