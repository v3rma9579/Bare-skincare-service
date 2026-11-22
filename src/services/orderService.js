const Order = require("../models/Order");

const createOrder = async (data) => {
    return await Order.create(data);
};

const getAllOrders = async () => {
    return await Order.find()
        .populate("userId")
        .populate("orderItems.productId");
};

const getOrderById = async (id) => {
    return await Order.findById(id)
        .populate("userId")
        .populate("orderItems.productId");
};

const updateOrder = async (id, data) => {
    return await Order.findByIdAndUpdate(id, data, { new: true });
};

const deleteOrder = async (id) => {
    return await Order.findByIdAndDelete(id);
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};