import compression from "compression";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from 'path';

import auth from "./routes/auth.js";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the 'uploads' directory as static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

app.use(compression());

app.use("/auth", auth);

app.all("*", (req, res) => {
   res.status(404).json({
      message: `Can't find ${req.originalUrl} on this server!`,
   });
});

export default app;
