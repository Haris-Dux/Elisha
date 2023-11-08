const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../Controller/productController");

const productRouter = express.Router();

productRouter.post("/createProduct", createProduct);
productRouter.post("/getAllProducts", getAllProducts);
productRouter.post("/updateProduct", updateProduct);
productRouter.post("/deleteProduct", deleteProduct);
productRouter.post("/getProduct", getProduct);

module.exports = productRouter;
