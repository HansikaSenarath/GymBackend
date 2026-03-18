import { validationResult } from "express-validator";
import { sendError } from "../utils/response.js";

/**
 * Runs after express-validator checks and returns 422 if any field fails
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendError(res, "Validation failed", 422, errors.array());
    }
    next();
};

export default validate;
