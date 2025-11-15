import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true }
);

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);

export default Volunteer;