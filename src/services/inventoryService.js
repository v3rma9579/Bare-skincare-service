const Inventory = require("../models/Inventory");

const createInventory = async (data) => {
    return await Inventory.create(data);
};

const getAllInventory = async () => {
    return await Inventory.find().populate("productId");
};

const getInventoryById = async (id) => {
    return await Inventory.findById(id).populate("productId");
};

const updateInventory = async (id, data) => {
    return await Inventory.findByIdAndUpdate(id, data, { new: true });
};

const deleteInventory = async (id) => {
    return await Inventory.findByIdAndDelete(id);
};

module.exports = {
    createInventory,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
};