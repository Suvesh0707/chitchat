import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const avatarLocalPath = req.files?.avatar?.[0]?.path;
        if (!avatarLocalPath) {
            return res.status(400).json({ message: "Avatar is required" });
        }
        console.log("Uploaded Files:", req.files);

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (!avatar) {
            return res.status(500).json({ message: "Avatar upload failed" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            email,
            password: hashedPassword,
            avatar: avatar.url
        });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, 
            sameSite: "strict"
        });

        res.status(201).json({ message: "User registered successfully", user: { id: user._id, username, email, avatar: user.avatar } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 24*60*60*1000, 
            sameSite: "strict",
        });

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure:false,
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getCurrentUser = (req, res) => {
    try {
        const token = req.cookies.token; 
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ userId: decoded.id }); 
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
};


export const getAvatar = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            username: user.username,
            avatar: user.avatar
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
