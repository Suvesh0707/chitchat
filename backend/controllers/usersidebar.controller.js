import { User } from "../models/user.model.js";
export const getUserForSidebar = async (req, res) => {
    try {
        console.log("Authenticated user:", req.user);
        
        const loginUserId = req.user._id; 
        const filteredUser = await User.find({ _id: { $ne: loginUserId } });
        console.log(filteredUser)
        res.status(200).json({users:filteredUser});
    } catch (error) {
        console.error("Error fetching users:", error); 
        res.status(500).json({ error: "Internal Server Error" });
    }
};
