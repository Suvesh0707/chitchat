import express from "express"
import { sendMessage, getMessage } from "../controllers/message.controller.js"
import protectRoute from "../middlewares/protect.route.js"

const router = express.Router()

router.get("/:id",protectRoute, getMessage)
router.post("/send/:id",protectRoute, sendMessage)

export default router