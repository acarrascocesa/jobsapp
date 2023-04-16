import express from "express";
import { updateUserController } from "../controllers/user.controller.js";
import userAuth from "../middlewares/auth.middleware.js";

//router object
const router = express.Router();


// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUserController);

export default router;
