import express from "express";
import { getVolunteers, createVolunteer} from "../controllers/volunteersController.js";

const router = express.Router();


router.post("/", createVolunteer);
router.get("/", getVolunteers);

export default router;