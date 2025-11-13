import FoodDonation from "../models/foodModel.js";

export const donateFood = async (req, res) => {
  try {
    const { city, area, foodName, isPacked, edibleDays, durationType, phone, note } = req.body;

    const newDonation = new FoodDonation({
      city,
      area,
      foodName,
      isPacked,
      edibleDays,
      durationType,
      phone,
      note
    });

    await newDonation.save();
    res.status(201).json({ message: "Food donation saved successfully" });
  } catch (error) {
    console.error("🔥 Donation Save Error:", error.message);
    res.status(500).json({ error: "Failed to save food donation" });
  }
};

export const getFoodDonations = async (req, res) => {
  try {
    const donations = await FoodDonation.find().sort({ createdAt: -1 });
    res.status(200).json(donations);
    } catch (error) {
    console.error("🔥 Fetch Donations Error:", error.message)
    res.status(500).json({ error: "Failed to fetch food donations" })
    }
};