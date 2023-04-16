// Import 
import express from "express";

// Import controller
import {testPostController} from "../controllers/test.controller.js";

// Router object
const router = express.Router();

// Create routes
router.post("/test-post", testPostController)

// Export the router
export default router