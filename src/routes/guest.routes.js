// routes/guest.routes.js
import express from "express";
import { createGuest, getGuests } from "../controllers/guest.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createGuest);
router.get("/", protect, getGuests);

export default router;
