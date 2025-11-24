import Contact from "../models/contactModel.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message, stared } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, message, stared });
    await newContact.save();

    res.status(201).json({ message: "Message received successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};



export const DelContacts = async (req,res) => {
        try {
            const {id} = req.params;
            const deleteRequest = await Contact.findByIdAndDelete(id);
            if (!deleteRequest) {
                return res.status(404).json({success: false, message: "Email is not found"});
            }
            res.status(200).json({success: true, message: "Email deleted successfully"});
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server Error: Unable to delete Email"
            });
        }
    }