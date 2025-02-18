import mongoose,{Schema} from "mongoose";

const conversationSchema = new Schema(
    {
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default:[],
        },
    ],
    },  
    {timestamps: true})

export const Conversation = mongoose.model("Conversation",conversationSchema)