import { User } from "../models/user.model.js";
export const getUserForSidebar = async (req, res) => {
    try {
        console.log("Authenticated user:", req.user); // Logs the user
        
        const loginUserId = req.user._id; // Access user ID from `req.user`
        const filteredUser = await User.find({ _id: { $ne: loginUserId } });
        console.log(filteredUser)
        res.status(200).json({users:filteredUser});
    } catch (error) {
        console.error("Error fetching users:", error); // Log the error message
        res.status(500).json({ error: "Internal Server Error" });
    }
};
