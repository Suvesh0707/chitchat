import React from "react";
import { Link } from "react-router-dom";
import { MessageSquareMore } from "lucide-react";

function Navbar() {
    return (
        <div className="flex justify-between items-center h-16 bg-gray-800 px-6 shadow-lg">
            <div className="flex items-center space-x-3">
                <MessageSquareMore className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-semibold text-white">ChatApp</span>
            </div>
   
            <div className="relative">
                <details className="dropdown">
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
