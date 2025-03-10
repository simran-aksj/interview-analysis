import express from "express";
import { analyzeResponse } from "../controllers/analysisController.js";

const router = express.Router();

// API endpoint
router.post("/", analyzeResponse);

export default router;
