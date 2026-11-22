const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    alertType: {
      type: String,
      enum: [
        "LOW_STOCK",
        "PRODUCT_DISPATCHED",
        "PRODUCT_DELIVERED",
        "PAYMENT_SUCCESSFUL",
        "PAYMENT_FAILED",
        "ORDER_CANCELLED",
      ],
      required: true,
    },

    message: {
      type: String,
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Alert", alertSchema);