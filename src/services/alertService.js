const Alert = require("../models/Alert");

const createAlert = async (data) => {
    return await Alert.create(data);
};

const getAllAlerts = async () => {
    return await Alert.find()
        .populate("userId")
        .populate("productId");
};

const getAlertById = async (id) => {
    return await Alert.findById(id)
        .populate("userId")
        .populate("productId");
};

const updateAlert = async (id, data) => {
    return await Alert.findByIdAndUpdate(id, data, { new: true });
};

const deleteAlert = async (id) => {
    return await Alert.findByIdAndDelete(id);
};

module.exports = {
    createAlert,
    getAllAlerts,
    getAlertById,
    updateAlert,
    deleteAlert
};