import { Router } from "express";
import { createFolderController } from "../controllers/drive.controller.js";

const router = Router();

router.post("/folder", createFolderController);

export default router;
