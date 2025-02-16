import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Chat() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
            <Navbar />

            {/* Main Layout */}
            <div className="flex flex-1 p-6 gap-6">
                {/* Sidebar */}
                <div
                    className={`fixed top-0 left-0 h-full bg-gray-800 w-64 z-50 transform transition-transform duration-300 ease-in-out ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } sm:relative sm:translate-x-0 sm:w-72 border-r border-gray-700 shadow-xl rounded-lg p-4`}
                >
                    <button
                        className="sm:hidden mb-4 text-gray-400 hover:text-white focus:outline-none"
                        onClick={closeSidebar}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <h2 className="text-xl font-bold mb-4 text-blue-400">Chats</h2>
                    <div className="space-y-3">
                        {["Suvesh", "Siddesh", "Pranav", "Kirti", "Tanvi"].map((name, index) => (
                            <div
                                key={index}
                                className="flex items-center p-3 bg-gray-700 hover:bg-blue-600 rounded-lg transition text-white shadow-md"
                            >
                                <img
                                    className="w-10 h-10 rounded-full object-cover border border-blue-500"
                                    src="https://t4.ftcdn.net/jpg/06/59/13/31/360_F_659133125_S0VAnb5NNknokdB47K61zDsczWgZJTMf.jpg"
                                    alt={`${name} avatar`}
                                />
                                <span className="ml-3 text-md font-semibold">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Section */}
                <div className="flex-1 flex flex-col p-6 bg-gray-800 rounded-lg shadow-2xl border border-gray-700">
                    <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-900 rounded-lg text-gray-300 shadow-md">
                        {/* Messages would be displayed here */}
                    </div>

                    <div className="flex items-center p-3 mt-3 border-t border-gray-600">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-grow h-12 px-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                        />
                        <button
                            className="ml-3 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-lg"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
                    onClick={closeSidebar}
                ></div>
            )}
        </div>
    );
}

export default Chat;
