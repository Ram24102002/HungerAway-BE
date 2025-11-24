import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import foodRoutes from "./routes/foodRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import volunteersRoutes from "./routes/volunteersRoutes.js";
import foodRequestRoutes from "./routes/foodRequestRoutes.js";

dotenv.config();

// Connect DB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());  // Use this instead of bodyParser
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/food-donations", foodRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/volunteers", volunteersRoutes);
app.use("/api/requests", foodRequestRoutes);

app.get('/ping', (req, res) => {
  res.send('Pong');
});

app.get("/ApiIsRunning", (req, res) => {
  res.send("✅ API is running...");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`❌ Port ${PORT} is already in use`);
  } else {
    console.error(err);
  }
});