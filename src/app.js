import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/env.js";

// Route imports
import contactRoutes from "./modules/contact/contact.routes.js";
import serviceRoutes from "./modules/service/service.routes.js";
import trainerRoutes from "./modules/trainer/trainer.routes.js";
import membershipRoutes from "./modules/membership/membership.routes.js";

// Middleware imports
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// Security & parsing middleware
app.use(helmet());
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (mobile apps, curl, Postman)
            if (!origin) return callback(null, true);
            // Allow any localhost port in development
            if (config.nodeEnv === "development" && /^http:\/\/localhost(:\d+)?$/.test(origin)) {
                return callback(null, true);
            }
            // Allow configured origin in production
            if (origin === config.corsOrigin) return callback(null, true);
            callback(new Error(`CORS blocked: ${origin}`));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(morgan(config.nodeEnv === "development" ? "dev" : "combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/health", (req, res) => {
    res.json({ success: true, message: "Server is running", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/contacts", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/memberships", membershipRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global error handler (must be last)
app.use(errorHandler);

export default app;
