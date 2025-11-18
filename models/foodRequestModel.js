import mongoose from "mongoose";

const foodRequestSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        phone: {type: String, required: true},
        donation: {type: mongoose.Schema.Types.ObjectId, ref: "foodDonation", required: true},
    },
    {
        timestamps:true
    }
);

const foodRequest = mongoose.model("foodRequest", foodRequestSchema);

export default foodRequest;