import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
});

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Connected to Local MySQL Database");
    conn.release();
  } catch (err) {
    console.error("❌ Local MySQL connection error:", err.message);
  }
})();

export default pool;
