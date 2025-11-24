import express from "express";
import { getVolunteers, createVolunteer, delVolunteers} from "../controllers/volunteersController.js";

const router = express.Router();


router.post("/", createVolunteer);
router.get("/", getVolunteers);
router.delete("/:id",delVolunteers)

export default router;