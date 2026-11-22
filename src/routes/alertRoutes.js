const express = require("express");
const router = express.Router();
const logApiError = require("../middleware/apiErrorLogger");

const {
    createAlert,
    getAllAlerts,
    getAlertById,
    updateAlert,
    deleteAlert
} = require("../services/alertService");

router.post("/", async (req, res) => {
    try {
        const alert = await createAlert(req.body);
        res.status(201).json(alert);
    } catch (error) {
        logApiError(req, error, 400);
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const alerts = await getAllAlerts();
        res.json(alerts);
    } catch (error) {
        logApiError(req, error, 500);
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const alert = await getAlertById(req.params.id);
        if (!alert) return res.status(404).json({ message: "Alert not found" });
        res.json(alert);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const alert = await updateAlert(req.params.id, req.body);
        if (!alert) return res.status(404).json({ message: "Alert not found" });
        res.json(alert);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const alert = await deleteAlert(req.params.id);
        if (!alert) return res.status(404).json({ message: "Alert not found" });
        res.json({ message: "Alert deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;