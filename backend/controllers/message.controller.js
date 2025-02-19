import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"


export const sendMessage = async (req, res) => {
    try {
        const message = req.body.message || "";
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl = null;
        if (req.file) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (!cloudinaryResponse || !cloudinaryResponse.url) {
                return res.status(500).json({ error: "Image upload failed." });
            }
            imageUrl = cloudinaryResponse.url;
        }
        if (!message && !imageUrl) {
            return res.status(400).json({ error: "Message or image is required." });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            image: imageUrl,
        });

        // Save message and update conversation
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await conversation.save();
        await newMessage.save();

        res.status(201).json({ message: "Message sent successfully", data: newMessage });

    } catch (error) {
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); 

        if (!conversation) {
            return res.status(200).json([]);
        }
        const formattedMessages = conversation.messages.map(msg => ({
            _id: msg._id,
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            message: msg.message || "", 
            image: msg.image || null,  
            createdAt: msg.createdAt,
        }));

        res.status(200).json(formattedMessages);
        console.log("Retrieved Messages:", formattedMessages);
    } catch (error) {
        console.log("Error in getMessage controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


