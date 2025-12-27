// controllers/guest.controller.js
import Guest from "../models/Guest.js";

export const createGuest = async (req, res) => {
  console.log("first - ",req.body);
  const guest = await Guest.create({
    ...req.body,
    registeredBy: req.user.id
  });
  res.status(201).json(guest);
};

export const getGuests = async (req, res) => {
  const guests = await Guest.find();
  res.json(guests);
};
