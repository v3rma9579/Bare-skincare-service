const mongoose = require("mongoose");
const PRODUCT_TYPES = require("../constants/productTypes");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    benefits: [
      {
        type: String,
        trim: true,
      },
    ],

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    image: {
      type: String,
      trim: true,
    },

    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient",
      },
    ],

    skuCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    expiryDate: {
      type: Date,
    },

    productType: [
      {
        type: String,
        enum: PRODUCT_TYPES,
        required: true,
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Product", productSchema);