import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { MessageSquareShare } from "lucide-react";

function Chat() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);
    const [lightMode, setLightMode] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/currentuser", { withCredentials: true })
            .then((response) => {
                if (response.data?.userId) {
                    setCurrentUserId(response.data.userId);
                }
            })
            .catch((error) => console.error("Error fetching current user ID:", error));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/usersidebar", { withCredentials: true })
            .then((response) => {
                setUsers(response.data.users);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedUser) {
            setLoadingMessages(true);
            axios.get(`http://localhost:3000/api/v1/messages/${selectedUser}`, { withCredentials: true })
                .then((response) => {
                    setMessages(Array.isArray(response.data) ? response.data : []);
                })
                .catch((error) => {
                    console.error("Error fetching messages:", error);
                    setMessages([]);
                })
                .finally(() => setLoadingMessages(false));
        } else {
            setMessages([]);
        }
    }, [selectedUser]);

    const handleSendMessage = () => {
        if (messageInput.trim() && selectedUser) {
            axios.post(`http://localhost:3000/api/v1/messages/send/${selectedUser}`, 
                { message: messageInput }, { withCredentials: true })
                .then(() => {
                    setMessages([...messages, { senderId: currentUserId, message: messageInput }]);
                    setMessageInput('');
                })
                .catch((error) => console.error("Error sending message:", error));
        }
    };

    return (
        <>
            <Navbar lightMode={lightMode} setLightMode={setLightMode} />
            <div className={lightMode ? "bg-gray-100 text-black" : "bg-gray-900 text-white"} style={{ height: "calc(100vh - 65px)" }}>
                <div className="flex flex-1 p-6 gap-6" style={{ height: "100%" }}>
                    <div className={lightMode ? "bg-white text-black shadow-md" : "bg-gray-800 text-white shadow-lg"} style={{ width: "20%", height: "calc(100vh - 110px)", overflowY: "auto", borderRadius: "8px", padding: "12px" }}>
                        <h2 className="text-xl font-bold mb-4">Chats</h2>
                        {loading ? (
                            <div className="text-center">Loading...</div>
                        ) : (
                            users.map((user) => (
                                <div key={user._id} className={`flex items-center p-3 rounded-lg transition shadow-md cursor-pointer mb-2 hover:bg-blue-400 ${lightMode ? "bg-gray-200 text-black" : "bg-gray-700 text-white"}`} onClick={() => { setSelectedUser(user._id); setSelectedUserName(user.username); }}>
                                    <div className="w-10 h-10 flex items-center justify-center font-bold text-lg rounded-full shadow-md bg-blue-500 text-white">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="ml-3 text-md font-semibold">{user.username}</span>
                                </div>
                            ))
                        )}
                    </div>
                    <div className={lightMode ? "bg-white text-black shadow-md" : "bg-gray-800 text-white shadow-lg"} style={{ flex: 1, height: "100%", padding: "16px" }}>
                        {selectedUser ? (
                            <div className="flex flex-col h-full">
                                <h3 className="text-lg font-bold mb-2 flex gap-2"><MessageSquareShare className="w-8 h-8 text-blue-400" />Chatting with {selectedUserName}</h3>
                                <div className="flex-grow p-4 space-y-4 rounded-lg overflow-y-auto" style={{ maxHeight: "calc(100% - 80px)", backgroundColor: lightMode ? "#f3f4f6" : "#1f2937", color: lightMode ? "#000" : "#fff" }}>
                                    {loadingMessages ? (
                                        <div className="text-center">Loading messages...</div>
                                    ) : messages.length > 0 ? (
                                        messages.map((message, index) => (
                                            <div key={index} className={`chat ${message.senderId === currentUserId ? 'chat-end' : 'chat-start'}`}> 
                                                <div className={`chat-bubble p-3 rounded-xl max-w-xs shadow-lg ${message.senderId === currentUserId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>{message.message}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center">No messages yet</div>
                                    )}
                                </div>
                                <div className="flex items-center p-4 border-t mt-2" style={{ borderColor: lightMode ? "#d1d5db" : "#374151" }}>
                                    <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Type a message..." className={`flex-grow h-12 px-4 rounded-lg focus:outline-none ${lightMode ? 'bg-gray-300 text-black' : 'bg-gray-700 text-white'}`} />
                                    <button className="ml-3 px-6 py-2 font-bold rounded-lg shadow-md bg-blue-500 text-white" onClick={handleSendMessage}>Send</button>
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
