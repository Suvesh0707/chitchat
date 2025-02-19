import mongoose,{Schema} from "mongoose";

const messageSchema = new Schema(
    {
        senderId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        receiverId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        message:{
            type: String,
        },   
        image: {
            type: String, 
            default: null,
        },       
    },
    {timestamps: true})

export const Message = mongoose.model("Message", messageSchema)