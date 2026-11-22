const express = require("express");
const router = express.Router();
const logApiError = require("../middleware/apiErrorLogger");

const {
    createCart,
    getAllCarts,
    getCartById,
    updateCart,
    deleteCart
} = require("../services/cartService");

router.post("/", async (req, res) => {
    try {
        const cart = await createCart(req.body);
        res.status(201).json(cart);
    } catch (error) {
        logApiError(req, error, 400);
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const carts = await getAllCarts();
        res.json(carts);
    } catch (error) {
        logApiError(req, error, 500);
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const cart = await getCartById(req.params.id);
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const cart = await updateCart(req.params.id, req.body);
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const cart = await deleteCart(req.params.id);
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.json({ message: "Cart deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;