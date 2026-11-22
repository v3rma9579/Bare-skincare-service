const express = require("express");
const router = express.Router();
const logApiError = require("../middleware/apiErrorLogger");

const {
    createIngredient,
    getAllIngredients,
    getIngredientById,
    updateIngredient,
    deleteIngredient
} = require("../services/ingredientService");

router.post("/", async (req, res) => {
    try {
        const ingredient = await createIngredient(req.body);
        res.status(201).json(ingredient);
    } catch (error) {
        logApiError(req, error, 400);
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const ingredients = await getAllIngredients();
        res.json(ingredients);
    } catch (error) {
        logApiError(req, error, 500);
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const ingredient = await getIngredientById(req.params.id);
        if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });
        res.json(ingredient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const ingredient = await updateIngredient(req.params.id, req.body);
        if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });
        res.json(ingredient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const ingredient = await deleteIngredient(req.params.id);
        if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });
        res.json({ message: "Ingredient deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;