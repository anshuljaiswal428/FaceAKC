// routes/staff.routes.js
import express from "express";
import { createStaff, getAllStaff } from "../controllers/staff.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createStaff);
router.get("/", protect, getAllStaff);

export default router;
