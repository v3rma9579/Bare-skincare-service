const express = require("express");
const router = express.Router();
const logApiError = require("../middleware/apiErrorLogger");

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} = require("../services/orderService");

router.post("/", async (req, res) => {
    try {
        const order = await createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        logApiError(req, error, 400);
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.json(orders);
    } catch (error) {
        logApiError(req, error, 500);
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const order = await getOrderById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const order = await updateOrder(req.params.id, req.body);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const order = await deleteOrder(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;