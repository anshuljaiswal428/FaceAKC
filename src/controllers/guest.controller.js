import {
  createGuest as createGuestModel,
  getAllGuests as getAllGuestsModel,
} from "../models/Guest.js";

import { getFaceEmbedding } from "../utils/face.utils.js";

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

    const registeredBy = Number(req.user?.id);

    if (!registeredBy || Number.isNaN(registeredBy)) {
      return res.status(401).json({ message: "Invalid user" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Face image is required" });
    }

    // Conditional validation
    if (guestType === "ATTENDANT" && (!attendantName || !patientToMeet)) {
      return res.status(400).json({
        message: "Attendant name and patient name required",
      });
    }

    if (guestType === "OTHER" && (!name || !description)) {
      return res.status(400).json({
        message: "Name and description required",
      });
    }

    // Generate embedding
    const faceEmbedding = await getFaceEmbedding(req.file.buffer);

    const guest = await createGuestModel({
      guestType,
      mobile,
      attendantName,
      patientToMeet,
      name,
      description,
      faceEmbedding,
      registeredBy,
    });

    res.status(201).json({
      message: "Guest created with face data",
      guestId: guest.id,
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
