import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRouter from "./routes/auth.routes";
import topicRouter from "./routes/topic.routes";
import resourceRouter from "./routes/resource.routes";
import { authMiddleware } from "./middleware/auth.middleware";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// public route
app.use("/auth", authRouter);

// protected routes
app.use(authMiddleware);
app.use("/topics", topicRouter);
app.use("/resources", resourceRouter);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
