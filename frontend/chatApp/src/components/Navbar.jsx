import React from "react";
import { Link } from "react-router-dom";
import { MessageSquareMore, Sun, Moon } from "lucide-react";

function Navbar({ lightMode, setLightMode }) {
    return (
        <div className="flex justify-between items-center h-16 bg-gray-800 px-6 shadow-lg sticky">
            <div className="flex items-center space-x-3">
                <MessageSquareMore className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-semibold text-white">ChatApp</span>
            </div>

            <div className="flex items-center space-x-4">
                <button 
                    onClick={() => setLightMode(!lightMode)} 
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition text-white"
                >
                    {lightMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6 text-yellow-400" />}
                </button>

                <details className="relative">
                    <summary className="cursor-pointer bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition text-white">
                        Settings
                    </summary>
                    <ul className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                        <li className="p-2 hover:bg-gray-700 transition rounded text-white">
                            <Link to="/" className="block">Logout</Link>
                        </li>
                    </ul>
                </details>
            </div>
        </div>
    );
}

export default Navbar;
