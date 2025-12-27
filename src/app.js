// app.js
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import staffRoutes from "./routes/staff.routes.js";
import guestRoutes from "./routes/guest.routes.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/guests", guestRoutes);

export default app;
