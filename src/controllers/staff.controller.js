// controllers/staff.controller.js
import {
  createStaff as createStaffModel,
  getAllStaff as getAllStaffModel,
} from "../models/Staff.js";

export const createStaff = async (req, res) => {
  try {
    const { name, mobile, department } = req.body;

    const photo = req.file ? req.file.path : null;
    console.log(req.user);
    const registeredBy = Number(req.user.id);

    const staff = await createStaffModel({
      name,
      mobile,
      department,
      photo,
      registeredBy,
    });

    res.status(201).json({
      id: staff.id,
      name,
      mobile,
      department,
      photo,
      registeredBy,
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
