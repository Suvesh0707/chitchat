import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { getCurrentUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getAvatar } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }
]),registerUser)
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/currentuser", getCurrentUser);
router.get("/getavatar", getAvatar);



export default router;
