import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Homepage() {
    return (
        <div className="h-screen bg-gray-900 text-white flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
                <h1 className="text-4xl font-bold mb-4 text-blue-400">Welcome to ChatApp</h1>
                <p className="text-gray-300 max-w-md mb-6">
                    Connect with your friends, chat in real-time, and enjoy a seamless messaging experience.
                </p>
                
                <Link 
                    to="/chat"
                    className="relative inline-block px-8 py-3 font-bold text-white rounded-lg
                               bg-gradient-to-r from-purple-500 to-blue-500 
                               hover:from-blue-500 hover:to-purple-500
                               transition-all duration-300 ease-in-out
                               shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
                >
                    Get Started
                </Link>
            </div>
        </div>
    );
}

export default Homepage;