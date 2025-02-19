import express from "express"
import { sendMessage, getMessage } from "../controllers/message.controller.js"
import protectRoute from "../middlewares/protect.route.js"
import multer from "multer"
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router()

router.get("/:id",protectRoute, getMessage)
router.post("/send/:id",protectRoute, upload.single("image"), sendMessage);

export default router