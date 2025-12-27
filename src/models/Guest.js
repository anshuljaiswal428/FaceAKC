import db from "../config/db.js";

export const createGuest = async ({
  guestType,
  mobile,
  photo,
  attendantName,
  patientToMeet,
  name,
  description,
  registeredBy,
}) => {
  const [result] = await db.query(
    `INSERT INTO guests
     (guest_type, mobile, photo, attendant_name, patient_to_meet, name, description, registered_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      guestType,
      mobile,
      photo,
      attendantName,
      patientToMeet,
      name,
      description,
      registeredBy,
    ]
  );

  return { id: result.insertId };
};

export const getAllGuests = async () => {
  const [rows] = await db.query(
    `SELECT g.*, u.name AS registeredByName
     FROM guests g
     LEFT JOIN users u ON g.registered_by = u.id
     ORDER BY g.created_at DESC`
  );
  return rows;
};

export const getGuestById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM guests WHERE id = ?",
    [id]
  );
  return rows[0];
};
