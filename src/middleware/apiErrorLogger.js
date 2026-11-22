function logApiError(req, error, statusCode) {
  console.error(`[API Failure] ${req.method} ${req.originalUrl} - ${statusCode}`);
  console.error("Reason:", error instanceof Error ? error.message : error);

  if (error instanceof Error && error.stack) {
    console.error("Stack:", error.stack);
  }
}

module.exports = logApiError;
