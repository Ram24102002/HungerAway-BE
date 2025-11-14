import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import foodRoutes from "./routes/foodRoutes.js";


dotenv.config();

// Connect DB
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());


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
