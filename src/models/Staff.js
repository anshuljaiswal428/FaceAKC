import db from "../config/db.js";

export const createStaff = async ({
  name,
  mobile,
  department,
  photo,
  registeredBy,
}) => {
  const [result] = await db.query(
    `INSERT INTO staff 
     (name, mobile, department, photo, registered_by)
     VALUES (?, ?, ?, ?, ?)`,
    [name, mobile, department, photo, registeredBy]
  );

  return { id: result.insertId };
};

export const getAllStaff = async () => {
  const [rows] = await db.query(
    `SELECT s.*, u.name AS registeredByName
     FROM staff s
     LEFT JOIN users u ON s.registered_by = u.id
     ORDER BY s.created_at DESC`
  );
  return rows;
};

export const getStaffById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM staff WHERE id = ?",
    [id]
  );
  return rows[0];
};
