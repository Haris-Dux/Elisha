
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ordersSchema = new Schema(
  {
    items: {
      type: Array,
      required: true,
    },
    userID: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    paymentMethod : { type: String, required: true },
    totalAmount: { type: Number },
  },
  { timestamps: true }
);

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, returnValue) => {
    delete returnValue._id;
    delete returnValue.__v;
  },
});

  ordersSchema.statics.createOrder = async function (data) {
    const { items, name , userID, address, phone, paymentMethod , totalAmount } = data;
  
    if (items.length === 0) {
      throw new Error("No Items In Cart");
    }
  
    if (!userID) {
      throw new Error("Please provide user ID");
    }
  
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      throw new Error("User ID is not valid");
    }
  
    if (!address) {
      throw new Error("Address field is empty");
    }
  
    if (!phone) {
      throw new Error("Phone number is not provided");
    }
  
    if (!paymentMethod) {
      throw new Error("PaymentMethod is not provided");
    }
  
    if (!totalAmount) {
      throw new Error("Total Amount required");
    }
    if (!name) {
      throw new Error("Name is required");
    }
  
  
    const order = await this.create({
      items,
      userID,
      name,
      address,
      phone,
      paymentMethod,
      totalAmount
    });
  
    return order;
  };
  
  ordersSchema.statics.updateOrder = async function (data) {
    const { id, status, address, phone } = data;
    let orderQuery = {};
  
    if (!id) {
      throw new Error("No ID Provided");
    }
  
    if (status) {
      orderQuery = { ...orderQuery, status };
    }
  
    if (address) {
      orderQuery = { ...orderQuery, address };
    }
  
    if (phone) {
      orderQuery = { ...orderQuery, phone };
    }
  
    const order = await this.findByIdAndUpdate(id, orderQuery);
    return order;
  };
  
  ordersSchema.statics.getAllOrdersForUser = async function (data) {
    const { userID } = data;
    const orders = await this.find({ userID });
    return orders;
  };
  
  ordersSchema.statics.getOrderDetails = async function (data) {
    const { id } = data;
  
    if (!id) {
      throw new Error("No ID Provided");
    }
  
    const order = await this.findById(id);
    return order;
  };
  
  module.exports = mongoose.model("orders", ordersSchema);