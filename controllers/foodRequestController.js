import mongoose from 'mongoose';
import foodRequest from "../models/foodRequestModel.js";


export const foodRequestController = {
    createFoodRequest: async (req, res) => {
        try {
            console.log('Request body:', req.body);
            const {name, phone, donation} = req.body;
            
            const donationId = typeof donation === 'string' ? donation : donation._id;
            
            if (!mongoose.Types.ObjectId.isValid(donationId)) {
                return res.status(400).json({message: "Invalid donation ID"});
            }

            const newFoodRequest = new foodRequest({
                name,
                phone,
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
        try {
            const requests = await foodRequest.find()
                .populate('donation')  // This will populate the donation details
                .sort('-createdAt');  // Sort by newest first
            
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

    // Get food request by ID
    getFoodRequestById: async (req, res) => {
        try {
            const request = await foodRequest.findById(req.params.id)
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
            const requests = await foodRequest.find({ phone: req.params.phone })
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
    }
};


