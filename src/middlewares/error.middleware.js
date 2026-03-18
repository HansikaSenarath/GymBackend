import { sendError } from "../utils/response.js";

/**
 * Global error handler — must be registered last in app.js
 */
const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);

    // Prisma known request errors
    if (err.code === "P2002") {
        return sendError(res, "A record with that value already exists.", 409);
    }
    if (err.code === "P2025") {
        return sendError(res, "Record not found.", 404);
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return sendError(res, message, statusCode);
};

export default errorHandler;
