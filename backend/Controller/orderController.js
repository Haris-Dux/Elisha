
const orderModel = require("../Model/orderModel");

async function createOrder(req, res) {
    try {
      const orderData = await orderModel.createOrder(req.body);
      res.status(200).json({ orderData, msg: "Order Created" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
  
  async function updateOrder(req, res) {
    try {
      const orderData = await orderModel.updateOrder(req.body);
      res.status(200).json({ orderData, msg: "Order Updated" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
  
  async function getAllOrdersForUser(req, res) {
    try {
      const orderData = await orderModel.getAllOrdersForUser(req.body);
      res.status(200).json({ orderData, msg: "Got All Orders For User" });
    } catch (error) {
      res.status(400).json({ orderData, msg: error.message });
    }
  }
  
  async function getOrderDetails(req, res) {
    try {
      const orderData = await orderModel.getOrderDetails(req.body);
      res.status(200).json({ orderData, msg: "Got Order Details" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
  
  async function getAllOrders(req, res) {
    try {
      const orderData = await orderModel.find({});
      res.status(200).json({ orderData, msg: "Got All Orders" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  module.exports = {
    createOrder,
    updateOrder,
    getAllOrders,
    getAllOrdersForUser,
    getOrderDetails
  }