import express from "express";
import { donateFood, getFoodDonations, updateDonation } from "../controllers/foodController.js";

const router = express.Router();

// POST - Save food donation
router.post("/", donateFood);

// GET - Retrieve all food donations
router.get("/", getFoodDonations);

router.put("/:id", updateDonation);


export default router; // ✅ this must exist
