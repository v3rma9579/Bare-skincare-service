const mongoose = require("mongoose");

async function connectDatabase() {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error("[Database Error] MONGODB_URI is not configured in .env");
    throw new Error("MONGODB_URI is not configured");
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("[Database] Connected successfully");
  } catch (error) {
    console.error("[Database Error] Connection failed:", error);
    throw error;
  }
}

module.exports = connectDatabase;
