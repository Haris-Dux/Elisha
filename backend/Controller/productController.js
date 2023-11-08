
const productModel = require("../Model/productModel");

async function createProduct(req,res) {
    try {
        const productData = await productModel.createProduct(req.body);
        res.status(200).json({ productData, msg: "Product Was Created" });
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
};

async function getAllProducts(req, res) {
    try {
      const productData = await productModel.getAllProducts(req.body);
      res.status(200).json({ productData, msg: "Got All Products" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };

  async function updateProduct(req,res) {
    try {
        const productData = await productModel.updateProduct(req.body);
        res.status(200).json({ productData, msg: "Product Data Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
  };

  async function deleteProduct(req, res) {
    try {
      const productData = await productModel.deleteProduct(req.body);
      res.status(200).json({ productData, msg: "Product Was Deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };

  async function getProduct(req, res) {
    try {
      const productData = await productModel.getProduct(req.body);
      res.status(200).json({ productData, msg: "Got Product" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };

module.exports = {createProduct,getAllProducts,updateProduct,updateProduct,deleteProduct,getProduct}