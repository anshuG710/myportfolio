import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// Routes
import contactRoutes from "./server/routes/contact";
import projectRoutes from "./server/routes/projects";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection
let isConnected = false;
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI && MONGODB_URI !== "YOUR_MONGODB_URI") {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      isConnected = true;
    })
    .catch(err => {
      console.error('MongoDB connection error:', err.message);
      console.log('Falling back to local data mode.');
    });
} else {
  console.log('--- RUNNING IN LOCAL DATA MODE ---');
  console.log('To use a real database, provide a MONGODB_URI in the Secrets panel.');
  console.log('----------------------------------');
}

export const getDbStatus = () => isConnected;

async function startServer() {
  const app = express();
  const PORT = 3000;

// Middleware
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  // API Routes
  app.use('/api/contact', contactRoutes);
  app.use('/api/projects', projectRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
