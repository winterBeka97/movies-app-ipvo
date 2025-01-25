import cluster from "cluster";
import os from "os";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./config/db.js"; // Adjust the path as needed
import userRoutes from "./routes/userRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config(); // Load environment variables

if (cluster.isMaster) {
    // Master process forks workers for each CPU core
    const numCPUs = os.cpus().length;
    console.log(`Master process ${process.pid} is running`);
    console.log(`Forking ${numCPUs} workers...`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Log when workers exit
    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} exited. Starting a new worker...`);
        cluster.fork();
    });
} else {
    // Worker processes handle incoming requests
    connectDB(); // Connect to MongoDB

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    const PORT = process.env.PORT || 3000;

    // Routes
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/genre", genreRoutes);
    app.use("/api/v1/movies", moviesRoutes);
    app.use("/api/v1/upload", uploadRoutes);

    // Static file handling
    const __dirname = path.resolve();
    app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

    // Start server on assigned port
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} is running on port ${PORT}`);
    });
}
