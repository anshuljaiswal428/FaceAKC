import {
  createStaff as createStaffModel,
  getAllStaff as getAllStaffModel,
} from "../models/Staff.js";

import { getFaceEmbedding } from "../utils/face.utils.js";

export const createStaff = async (req, res) => {
  try {
    const { name, mobile, department } = req.body;
    const registeredBy = Number(req.user?.id);

    if (!registeredBy || Number.isNaN(registeredBy)) {
      return res.status(401).json({ message: "Invalid user" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Face image is required" });
    }

    // Generate face embedding (NO image stored)
    const faceEmbedding = await getFaceEmbedding(req.file.buffer);

    const staff = await createStaffModel({
      name,
      mobile,
      department,
      faceEmbedding,
      registeredBy,
    });

    res.status(201).json({
      message: "Staff created with face data",
      staffId: staff.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create staff",
      error: error.message,
    });
  }
};

export const getAllStaff = async (req, res) => {
  try {
    const staff = await getAllStaffModel();
    res.json(staff);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch staff",
      error: error.message,
    });
  }
};
