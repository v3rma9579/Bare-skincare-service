const Cart = require("../models/Cart");

const createCart = async (data) => {
    return await Cart.create(data);
};

const getAllCarts = async () => {
    return await Cart.find()
        .populate("userId")
        .populate("items.productId");
};

const getCartById = async (id) => {
    return await Cart.findById(id)
        .populate("userId")
        .populate("items.productId");
};

const updateCart = async (id, data) => {
    return await Cart.findByIdAndUpdate(id, data, { new: true });
};

const deleteCart = async (id) => {
    return await Cart.findByIdAndDelete(id);
};

module.exports = {
    createCart,
    getAllCarts,
    getCartById,
    updateCart,
    deleteCart
};