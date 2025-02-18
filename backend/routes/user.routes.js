import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { getCurrentUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/currentuser", getCurrentUser);


export default router;
