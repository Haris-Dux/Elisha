const { Router } = require("express");
const {
  createOrder,
  updateOrder,
  getAllOrdersForUser,
  getOrderDetails,
  getAllOrders,
} = require("../Controller/orderController");

const orderRouter = Router();

orderRouter.post("/createOrder", createOrder);
orderRouter.post("/updateOrder", updateOrder);
orderRouter.post("/getAllOrdersForUser", getAllOrdersForUser);
orderRouter.post("/getOrderDetails", getOrderDetails);
orderRouter.post("/getAllOrders", getAllOrders);

module.exports = orderRouter;
