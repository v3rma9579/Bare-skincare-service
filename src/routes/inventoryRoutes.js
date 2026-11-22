const express = require("express");
const router = express.Router();
const logApiError = require("../middleware/apiErrorLogger");

const {
    createInventory,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
} = require("../services/inventoryService");

router.post("/", async (req, res) => {
    try {
        const inventory = await createInventory(req.body);
        res.status(201).json(inventory);
    } catch (error) {
        logApiError(req, error, 400);
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const inventory = await getAllInventory();
        res.json(inventory);
    } catch (error) {
        logApiError(req, error, 500);
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const inventory = await getInventoryById(req.params.id);
        if (!inventory) return res.status(404).json({ message: "Inventory not found" });
        res.json(inventory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const inventory = await updateInventory(req.params.id, req.body);
        if (!inventory) return res.status(404).json({ message: "Inventory not found" });
        res.json(inventory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const inventory = await deleteInventory(req.params.id);
        if (!inventory) return res.status(404).json({ message: "Inventory not found" });
        res.json({ message: "Inventory deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;