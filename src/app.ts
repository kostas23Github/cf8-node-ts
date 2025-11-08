import express from "express";
import morgan from "morgan";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import roleRoutes from "./routes/role.routes";
import authRoutes from "./routes/auth.routes";
import { setupSwagger } from "./swagger";

const app = express();

setupSwagger(app);

app.use(morgan("dev"));  // HTTP request logger middleware for terminal.
app.use(express.json()); // Parse incoming JSON requests.
app.use(cors({
  origin: ["http://localhost:4200", "https://www.aueb.gr"]
})); // Enable CORS for these routes.

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/auth", authRoutes);

export default app;