import jwt, { decode } from"jsonwebtoken"
import { User } from "../models/user.model.js"

const protectRoute =async (req, res, next) =>{

    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({ msg: "No token, authorization denied" })
        }
        const user = await User.findById(decoded.user._id).select("-password")
        if(!user){
            return res.status(401).json({ msg: "User not found" })
            }

        req.user = user
        next()
    } catch (error) {
        console.log("Error in ProtectionRoute middleware", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export default protectRoute