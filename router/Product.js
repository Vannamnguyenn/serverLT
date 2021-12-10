const express = require("express");
const Router = express.Router();
const controller = require("../controller/Controller");

Router.post("/create", controller.createProduct);

module.exports = Router;
