const Product = require("../models/Product");

const createProduct = async (data) => {
    return await Product.create(data);
};

const getAllProducts = async () => {
    return await Product.find().populate("ingredients");
};

const getProductById = async (id) => {
    return await Product.findById(id).populate("ingredients");
};

const updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};