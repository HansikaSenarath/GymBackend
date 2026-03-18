import app from "./app.js";
import { config } from "./config/env.js";
import prisma from "./config/db.js";

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("✅ Database connected successfully");

        const PORT = process.env.PORT || config.port;

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📦 Environment: ${config.nodeEnv}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
};

process.on("SIGINT", async () => {
    console.log("\n🛑 Shutting down gracefully...");
    await prisma.$disconnect();
    process.exit(0);
});

process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    process.exit(0);
});

startServer();