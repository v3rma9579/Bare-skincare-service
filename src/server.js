require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDatabase();

  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  server.on("error", (error) => {
    console.error(`[Server Error] Unable to listen on port ${PORT}:`, error);
  });
}

startServer().catch((error) => {
  console.error("[Startup Error] Failed to start server:", error);
  console.error(error.stack || error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("[Unhandled Rejection]:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("[Uncaught Exception]:", error);
  process.exit(1);
});
