import { createClient } from "@supabase/supabase-js";
import connectionPool from "../utils/db.mjs";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Middleware ตรวจสอบ JWT token และดึง user_id
const protectUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // ดึง token จาก Authorization header
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  try {
    // ใช้ Supabase ตรวจสอบ token และดึงข้อมูลผู้ใช้
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const userId = data.user.id;

    const roleQuery = `
    SELECT role FROM users WHERE id = $1
  `;
  const roleResult = await connectionPool.query(roleQuery, [userId]);

  if (roleResult.rowCount === 0) {
    return res.status(403).json({ error: "User not found in users table" });
  }

  const userRole = roleResult.rows[0].role;

  // แนบข้อมูล user และ role
  req.user = {
    ...data.user,
    checkRole: userRole,
  };

    // ดำเนินการต่อไปยัง middleware หรือ route handler ถัดไป
    next();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectUser;
