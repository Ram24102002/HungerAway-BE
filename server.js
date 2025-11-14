import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRoutes from "./routes/foodRoutes.js";

dotenv.config();
const app = express();

// DB
connectDB();

// Middleware

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://hungeraway-be.onrender.com/"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());



app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});


// Routes
app.use("/api/food-donations", foodRoutes);

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
