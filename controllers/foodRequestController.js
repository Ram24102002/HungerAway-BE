import mongoose from 'mongoose';
import foodRequestModel from "../models/foodRequestModel.js";
import FoodDonations from '../models/foodModel.js'




export const foodRequestController = {
    createFoodRequest: async (req, res) => {
        try {
            console.log('Request body:', req.body);
            const { name, phone, requestnote, donation } = req.body;
            
            const donationId = typeof donation === 'string' ? donation : donation._id;
            
            if (!mongoose.Types.ObjectId.isValid(donationId)) {
                return res.status(400).json({message: "Invalid donation ID"});
            }

            const newFoodRequest = new foodRequestModel({
                name,
                phone,
                requestnote,
                donation: donationId
            });

            const savedRequest = await newFoodRequest.save();
            res.status(201).json({
                success: true,
                data: savedRequest
            });
        }
        catch (error){
            console.error('Error creating food request:', error);
            res.status(500).json({
                success: false,
                message: "Server Error: Unable to create food request.",
                error: error.message
            });
        }
    },
     // Get all food requests
    getAllFoodRequests: async (req, res) => {
        console.log('→ getAllFoodRequests controller reached');
    try {
        // First try without populate to verify base data retrieval
        const basicRequests = await foodRequestModel.find();
        console.log('Basic requests without populate:', basicRequests);




        // Check the collection name
        console.log('Collection name:', foodRequestModel.collection.name);
        
        // Try a simpler query first
        const count = await foodRequestModel.countDocuments();
        console.log('Total documents:', count);
        
        // Check for any documents without conditions
        const allDocs = await foodRequestModel.find({}).lean();
        console.log('All documents:', allDocs);




        // Then try with populate
        const requests = await foodRequestModel.find()
            .populate({
                path: 'donation',
                options: { strictPopulate: false } // This makes populate optional
            })
            .sort('-createdAt');
        
        console.log('Populated requests:', requests);

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        console.error('Error in getAllFoodRequests:', error);
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to fetch food requests.",
            error: error.message
        });
    }
},

    // Get food request by ID
    getFoodRequestById: async (req, res) => {
        try {
            const request = await foodRequestModel.findById(req.params.id)
                .populate('donation');

            if (!request) {
                return res.status(404).json({
                    success: false,
                    message: "Food request not found"
                });
            }

            res.status(200).json({
                success: true,
                data: request
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server Error: Unable to fetch food request.",
                error: error.message
            });
        }
    },

    // Get food requests by user phone number
    getFoodRequestsByPhone: async (req, res) => {
        try {
            const requests = await foodRequestModel.find({ phone: req.params.phone })
                .populate('donation')
                .sort('-createdAt');

            res.status(200).json({
                success: true,
                count: requests.length,
                data: requests
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server Error: Unable to fetch food requests.",
                error: error.message
            });
        }
    },
    delFoodRequests: async (req, res) => {
        try {
            const {id} = req.params;
            const deleteRequest = await foodRequestModel.findByIdAndDelete(id);
            if (!deleteRequest) {
                return res.status(404).json({success: false, message: "Food request not found"});
            }
            res.status(200).json({success: true, message: "Food request deleted successfully"});
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server Error: Unable to delete food request.",
                error: error.message
            });
        }
    },
    updateRequestPicked : async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await foodRequestModel.findByIdAndUpdate(
      id,
      { picked: req.body.picked }, // true
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},
markDonationPicked : async (req, res) => {
  try {
    const donation = await FoodDonations.findByIdAndUpdate(
      req.params.id,
      { picked: req.body.picked },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.json({ success: true, donation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
};


