import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import dayjs from "dayjs";
import { FaPaperclip } from "react-icons/fa";
import { io } from "socket.io-client";

const socket = io("https://chitchat-bwfh.onrender.com", { transports: ["websocket"], autoConnect: false });

function Chat() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState("");
    const [selectedUserAvatar, setSelectedUserAvatar] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [lightMode, setLightMode] = useState(false);
    
    const messagesEndRef = useRef(null); 

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        axios.get("https://chitchat-bwfh.onrender.com/api/v1/currentuser", { withCredentials: true })
            .then(response => {
                setCurrentUserId(response.data?.userId || null);
                socket.connect();
            })
            .catch(error => console.error("Error fetching current user ID:", error));
    }, []);


    useEffect(() => {
        axios.get("https://chitchat-bwfh.onrender.com/api/v1/usersidebar", { withCredentials: true })
            .then(response => {
                setUsers(response.data.users);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedUser) {
            setLoadingMessages(true);
            axios.get(`https://chitchat-bwfh.onrender.com/api/v1/messages/${selectedUser}`, { withCredentials: true })
                .then(response => setMessages(Array.isArray(response.data) ? response.data : []))
                .catch(error => {
                    console.error("Error fetching messages:", error);
                    setMessages([]);
                })
                .finally(() => setLoadingMessages(false));
        } else {
            setMessages([]);
        }
    }, [selectedUser]);

    useEffect(() => {
        if (currentUserId) {
            socket.emit("join_room", currentUserId);
        }
    }, [currentUserId]);

    useEffect(() => {
        socket.on("receive_message", (newMessage) => {
            console.log("Message received:", newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => socket.off("receive_message");
    }, []);

    const handleSendMessage = async () => {
        if (!messageInput.trim() && !imageFile) return;

        const formData = new FormData();
        formData.append("message", messageInput);
        if (imageFile) formData.append("image", imageFile);

        try {
            const response = await axios.post(
                `https://chitchat-bwfh.onrender.com/api/v1/messages/send/${selectedUser}`,
                formData,
                { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
            );

            const newMessage = response.data.data;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            socket.emit("send_message", newMessage);
            setMessageInput('');
            setImageFile(null);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <>
            <Navbar lightMode={lightMode} setLightMode={setLightMode} />
            <div className={lightMode ? "bg-gray-100 text-black" : "bg-gray-900 text-white"} style={{ height: "calc(100vh - 65px)" }}>
                <div className="flex flex-1 p-6 gap-6" style={{ height: "100%" }}>
                    
                    <div className={`w-1/4 h-full overflow-y-auto p-4 rounded-lg shadow-md scrollbar-hidden ${lightMode ? "bg-white text-black" : "bg-gray-800 text-white"}`}>
                        <h2 className="text-xl font-bold mb-4">Chats</h2>
                        {loading ? (
                            <div className="text-center">Loading...</div>
                        ) : (
                            users.map(user => (
                                <div 
                                    key={user._id} 
                                    className={`flex items-center p-3 rounded-lg transition cursor-pointer mb-3 hover:bg-blue-400 ${lightMode ? "bg-gray-200 text-black" : "bg-gray-700 text-white"}`}
                                    onClick={() => { 
                                        setSelectedUser(user._id); 
                                        setSelectedUserName(user.username); 
                                        setSelectedUserAvatar(user.avatar);
                                    }}
                                >
                                    <img src={user.avatar} alt="User Avatar" className="w-16 h-16 rounded-full object-cover" />
                                    <span className="ml-3 text-md font-semibold">{user.username}</span>
                                </div>
                            ))
                        )}
                    </div>

                    <div className={`flex-1 h-full p-6 rounded-lg shadow-md ${lightMode ? "bg-white text-black" : "bg-gray-800 text-white"}`}>
                        {selectedUser ? (
                            <div className="flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-4 p-3 bg-gray-700/50 rounded-lg">
                                    <img src={selectedUserAvatar} alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
                                    <h3 className="text-lg font-bold">{selectedUserName}</h3>
                                </div>

                                <div className="flex-grow p-4 space-y-4 rounded-lg overflow-y-auto scrollbar-hidden "
                                    style={{ maxHeight: "calc(100% - 140px)", backgroundColor: lightMode ? "#f3f4f6" : "#1f2937" }}>
                                    {loadingMessages ? (
                                        <div className="text-center">Loading messages...</div>
                                    ) : messages.length > 0 ? (
                                        messages.map((message, index) => (
                                            <div key={index} className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`p-3 rounded-xl max-w-xs shadow-lg break-words ${message.senderId === currentUserId ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' : 'bg-gray-300 text-black'}`}>
                                                    {message.message && <p>{message.message}</p>}
                                                    <div className="text-xs text-white mt-1">{dayjs(message.createdAt).format("h:mm A")}</div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center">No messages yet</div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                <div className="flex items-center gap-4 mt-4 p-3 bg-gray-700/50 rounded-lg">
                                    <label className="cursor-pointer">
                                        <FaPaperclip size={20} className="text-white" />
                                        <input type="file" className="hidden" onChange={(e) => setImageFile(e.target.files[0])} />
                                    </label>
                                    <input
                                        type="text"
                                        className="flex-grow p-2 rounded-lg border"
                                        placeholder="Type a message..."
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                    />
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={handleSendMessage}>
                                        post
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center flex items-center justify-center h-full text-xl">Select a user to start chatting</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;
