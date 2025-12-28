// routes/staff.routes.js
import express from "express";
import { createStaff, getAllStaff } from "../controllers/staff.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js"; 

const router = express.Router();

// Create staff with face image
router.post(
  "/",
  protect,
  upload.single("image"), 
  createStaff
);

// Get all staff
router.get("/", protect, getAllStaff);

export default router;
