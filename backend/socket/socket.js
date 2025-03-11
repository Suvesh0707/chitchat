import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["https://chitchat-bwfh.onrender.com"],
        methods:["GET","POST"],
        credentials:true,
    }
});


io.on('connection',(socket)=>{
    console.log("a user connected",socket.id)

    socket.on("join_room", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room`);
    });

    socket.on("send_message", (message) => {
        console.log("Received message:", message);
    
        if (!message || !message.receiverId) {
            console.error("Error: Invalid message object received", message);
            return; // Stop execution if message is invalid
        }
    
        io.to(message.receiverId).emit("receive_message", message);
    });
    

    socket.on("disconnect",()=>{
        console.log("user disconnected", socket.id)
    })
})



export {app, io, server}