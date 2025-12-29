import express from "express";

import testRoutes from "./routes/test.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

export const app = express();

app.use(express.json());

app.use("/api", testRoutes);

app.use(errorHandler);
