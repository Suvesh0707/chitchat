import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

dotenv.config()

const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
}));
app.use(cookieParser())

app.use((req, res, next) => {
    console.log("Cookies received:", req.cookies); 
    next();
});

import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userSideBar from "./routes/usersidebar.routes.js"
app.use("/api/v1", userRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/usersidebar", userSideBar);



connectDB()

server.listen(port, ()=>{
    console.log(`App is listening on port:${port}`)
})