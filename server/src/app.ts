import express, { Express, Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import cors from "cors";

import errorHandler from "./middlewares/errorHandler.middleware.js";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadRoutes(app: Express) {
  const routesDir = path.join(__dirname, "routes");
  const files = fs.readdirSync(routesDir);

  for (const file of files) {
    if (!file.includes(".routes.")) {
      continue;
    }

    const fullPath = path.join(routesDir, file);
    const routerModule = await import(pathToFileURL(fullPath).href);

    if (!routerModule.default) {
      throw new Error(`Route file "${file}" does not export a default router`);
    }

    const router = routerModule.default as Router;
    const prefix = file.split(".")[0];

    app.use("/api/" + prefix, router);
  }
}

await loadRoutes(app);

app.use(errorHandler);
