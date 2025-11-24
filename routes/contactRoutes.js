import express from "express";
import { createContact, DelContacts, getContacts } from "../controllers/contactController.js";

const router = express.Router();

// POST - Save contact form data
router.post("/", createContact);

// GET - Retrieve all contact messages (for admin panel)
router.get("/", getContacts);

router.delete("/:id", DelContacts);

export default router;
