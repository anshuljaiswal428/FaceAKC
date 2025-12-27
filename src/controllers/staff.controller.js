// controllers/staff.controller.js
import Staff from "../models/Staff.js";

export const createStaff = async (req, res) => {
  const staff = await Staff.create({
    ...req.body,
    registeredBy: req.user.id
  });
  res.status(201).json(staff);
};

export const getAllStaff = async (req, res) => {
  const staff = await Staff.find();
  res.json(staff);
};
