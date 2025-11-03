import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/user.routes";
import roleRoutes from "./routes/role.routes";
import authRoutes from "./routes/auth.routes";
import { setupSwagger } from "./swagger";

const app = express();

setupSwagger(app);

app.use(morgan("dev"));  // HTTP request logger middleware for terminal.
app.use(express.json()); // Parse incoming JSON requests.

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/auth", authRoutes);

export default app;