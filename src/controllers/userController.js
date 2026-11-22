const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../services/userService");

// Add User
const addUser = async (req, res) => {
    try {
        const user = await createUser(req.body);

        res.status(201).json({
            success: true,
            message: "User added successfully",
            data: user
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Users
const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User By ID
const getUser = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update User
const editUser = async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete User
const removeUser = async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    addUser,
    getUsers,
    getUser,
    editUser,
    removeUser
};