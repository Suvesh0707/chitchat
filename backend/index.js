import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";
import cors from "cors"
import cookieParser from "cookie-parser";

dotenv.config()

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true })); // Allows parsing of URL-encoded bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors());

import userRoutes from "./routes/user.routes.js";
app.use("/api/v1", userRoutes);



connectDB()

app.listen(port, ()=>{
    console.log(`App is listening on port:${port}`)
})