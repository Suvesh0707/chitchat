import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

function Homepage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("https://chitchat-bwfh.onrender.com/api/v1/getavatar", {
                    withCredentials: true,
                });
                console.log(response);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error.response ? error.response.data : error.message);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="h-screen bg-gray-900 text-white flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
                {user ? (
                    <div className="relative flex flex-col items-center mb-6 p-6 bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700">
                        <div className="relative w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 shadow-lg">
                            <img 
                                src={user.avatar} 
                                alt="User Avatar" 
                                className="w-full h-full rounded-full object-cover border-4 border-gray-900 shadow-xl"
                            />
                        </div>
                        <h2 className="mt-4 text-3xl font-bold text-blue-400 drop-shadow-md">
                            {user.username}
                        </h2>
                    </div>
                ) : (
                    <p className="text-gray-400 text-lg animate-pulse">Loading user data...</p>
                )}
                
                <h1 className="text-5xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-xl">
                    Welcome to ChatApp
                </h1>
                <p className="text-gray-300 max-w-lg mb-6 text-lg leading-relaxed">
                    Connect with your friends, chat in real-time, and enjoy a seamless messaging experience with a vibrant and dynamic design.
                </p>

                <Link 
                    to="/chat"
                    className="relative inline-block px-12 py-4 text-lg font-semibold text-white rounded-xl
                               bg-gradient-to-r from-purple-500 to-blue-500 
                               hover:from-blue-500 hover:to-purple-500
                               transition-all duration-300 ease-in-out
                               shadow-xl hover:shadow-purple-500/50"
                >
                    Get Started
                </Link>
            </div>
        </div>
    );
}

export default Homepage;
