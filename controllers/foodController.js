import FoodDonation from "../models/foodModel.js";
import { applyCityFilter } from "../filters/cityFilter.js";


export const donateFood = async (req, res) => {
  try {
    let { edibleDays, durationType } = req.body;

    // Convert edibleDays to number safely
    edibleDays = Number(edibleDays);

    if (isNaN(edibleDays) || edibleDays <= 0) {
      return res.status(400).json({ error: "Invalid edibleDays value" });
    }

    const deleteAfterMs =
      durationType === "Hours"
        ? edibleDays * 60 * 60 * 1000
        : edibleDays * 24 * 60 * 60 * 1000;

    const expiresAt = new Date(Date.now() + deleteAfterMs);

    const donation = await FoodDonation.create({
      ...req.body,
      expiresAt
    });

    return res.status(201).json({
      success: true,
      donation
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    return res.status(500).json({ error: "Server error" });
  }
};



export const getFoodDonations = async (req, res) => {
  try {
    const filter = applyCityFilter(req.query);
    const donations = await FoodDonation.find(filter)
    res.status(200).json(donations);
    } catch (error) {
    console.error("🔥 Fetch Donations Error:", error.message)
    res.status(500).json({ error: "Failed to fetch food donations" })
    }
};