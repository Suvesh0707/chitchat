import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        lowercase: true,
        unique: true
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
        required: [true, "password is required"],
    },
    otp:{
        type: String,
    },
    otpExpiresIn:{
        type: Date,
    },
    isVerified:{
        type:Boolean,
    }
},{
    timestamps: true
})

export const User = mongoose.model("User", userSchema)