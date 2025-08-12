import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// public route
app.get("/", (req, res, next) => {
  res.json({ message: "Server is running" });
});

app.post(
  "/auth/login",
  require("./controllers/auth.controller").AuthController.login
);

// protected routes
// app.use(authMiddleware);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
