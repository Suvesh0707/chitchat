import jwt, { decode } from"jsonwebtoken"
import { User } from "../models/user.model.js"

const protectRoute =async (req, res, next) =>{

    try {
        const token = req.cookies.token
        console.log(req)
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({ msg: "No token, authorization denied" })
        }
        const user = await User.findById(decoded.id).select("-password")
        if(!user){
            return res.status(401).json({ msg: "User not found" })
            }
        req.user = user
        console.log(user)
        next()
    } catch (error) {
        console.log("Error in ProtectionRoute middleware", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export default protectRoute