const express = require("express");
const router = express.Router();
const logApiError = require("../middleware/apiErrorLogger");

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../services/userService");

// Create User
router.post("/", async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        logApiError(req, error, 400);
        res.status(400).json({ message: error.message });
    }
});

// Get All Users
router.get("/", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        logApiError(req, error, 500);
        res.status(500).json({ message: error.message });
    }
});

// Get User By ID
router.get("/:id", async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update User
router.put("/:id", async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete User
router.delete("/:id", async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;