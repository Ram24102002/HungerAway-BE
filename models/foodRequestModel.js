import mongoose from "mongoose";

const foodRequestSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        phone: {type: String, required: true},
        requestnote: {type: String, required: false},
        donation: {type: mongoose.Schema.Types.ObjectId, ref: "FoodDonations", required: true},
        picked: {type: Boolean,default: false},

    },
    {
        timestamps:true
    }
);

const foodRequestModel = mongoose.model("FoodRequest", foodRequestSchema);

export default foodRequestModel;