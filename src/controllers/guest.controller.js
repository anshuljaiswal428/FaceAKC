// controllers/guest.controller.js
import {
  createGuest as createGuestModel,
  getAllGuests as getAllGuestsModel,
} from "../models/Guest.js";

export const createGuest = async (req, res) => {
  try {
    const {
      guestType,
      mobile,
      attendantName,
      patientToMeet,
      name,
      description,
    } = req.body;

    const photo = req.file ? req.file.path : null;
    const registeredBy = Number(req.user?.id);

    // 🔒 Safety check (prevents NaN error again)
    if (!registeredBy || Number.isNaN(registeredBy)) {
      return res.status(401).json({
        message: "Invalid or missing user ID",
      });
    }

    // 🧠 Conditional validation (same logic as Mongo schema intent)
    if (guestType === "ATTENDANT") {
      if (!attendantName || !patientToMeet) {
        return res.status(400).json({
          message: "Attendant name and patient name are required",
        });
      }
    }

    if (guestType === "OTHER") {
      if (!name || !description) {
        return res.status(400).json({
          message: "Name and description are required",
        });
      }
    }

    const guest = await createGuestModel({
      guestType,
      mobile,
      photo,
      attendantName,
      patientToMeet,
      name,
      description,
      registeredBy,
    });

    res.status(201).json({
      id: guest.id,
      guestType,
      mobile,
      photo,
      attendantName,
      patientToMeet,
      name,
      description,
      registeredBy,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create guest",
      error: error.message,
    });
  }
};

export const getGuests = async (req, res) => {
  try {
    const guests = await getAllGuestsModel();
    res.json(guests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch guests",
      error: error.message,
    });
  }
};
