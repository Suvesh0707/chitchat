import express from 'express'
import protectRoute from '../middlewares/protect.route.js'
import { getUserForSidebar } from '../controllers/usersidebar.controller.js'

const router = express.Router()
router.get("/",protectRoute, getUserForSidebar)

export default router