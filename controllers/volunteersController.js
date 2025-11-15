import Volunteer from "../models/volunteerModel.js";

export const createVolunteer = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newVolunteer = new Volunteer({ name, phone, email });
    await newVolunteer.save();
    res.status(201).json({ message: "Volunteer registered successfully!" });
    } catch (error) {
    console.error("Error saving volunteer:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.status(200).json(volunteers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch volunteers" });
  }
};