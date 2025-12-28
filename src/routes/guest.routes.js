// routes/guest.routes.js
import express from "express";
import { createGuest, getGuests } from "../controllers/guest.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js"; 

const router = express.Router();

// Create guest with face image
router.post(
  "/",
  protect,
  upload.single("image"), 
  createGuest
);

// Get all guests
router.get("/", protect, getGuests);

export default router;
