const Ingredient = require("../models/Ingredient");

const createIngredient = async (data) => {
    return await Ingredient.create(data);
};

const getAllIngredients = async () => {
    return await Ingredient.find();
};

const getIngredientById = async (id) => {
    return await Ingredient.findById(id);
};

const updateIngredient = async (id, data) => {
    return await Ingredient.findByIdAndUpdate(id, data, { new: true });
};

const deleteIngredient = async (id) => {
    return await Ingredient.findByIdAndDelete(id);
};

module.exports = {
    createIngredient,
    getAllIngredients,
    getIngredientById,
    updateIngredient,
    deleteIngredient
};