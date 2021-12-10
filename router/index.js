const productRouter = require("../router/Product");
const hoaDon = require("../router/HoaDon");
const controller = require("../controller/Controller");

const initRouter = (app) => {
  app.use("/product", productRouter);
  app.use("/bill", hoaDon);
  app.get("/getData", controller.getData);
  app.get("/getSelledProduct", controller.getSellestProduct);
};

module.exports = initRouter;
