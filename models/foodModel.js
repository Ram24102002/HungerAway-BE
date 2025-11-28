import mongoose from "mongoose";

const FoodDonationsSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    area: { type: String, required: true },
    foodName: { type: String, required: true },
    isPacked: { type: Boolean, required: true },
    edibleDays: { type: Number, required: true },
    durationType: { type: String, enum: ["Hours", "Days"], required: true },
    phone: { type: String, required: true },
    note: { type: String },
    picked: {type: Boolean, default: false },

    expiresAt: {
      type: Date,
      index: { expires: 0 }, // TTL INDEX → auto delete when expiresAt time hits
    },
  },
  { timestamps: true }
);

const FoodDonations = mongoose.model("FoodDonations", FoodDonationsSchema);

export default FoodDonations;
