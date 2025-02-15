import React, { useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()// added useNavigate from react-router-dom to handle redirection after successful signup.

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/register", {
        username,
        email,
        password
      }, {
        headers: { "Content-Type": "application/json" }
      });
      console.log("Signup Successful:", response.data);
      navigate("/homepage") // After a successful signup, the user is redirected to the homepage using navigate('/').
    } catch (error) {
      console.error("Signup Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="border border-gray-700 rounded-lg shadow-lg p-10 bg-gray-800 text-white w-96 shadow-lg shadow-primary">
        <h2 className="text-3xl font-semibold text-center mb-6">Signup</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input 
              type="text" 
              className="w-full mt-1 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input 
              type="email" 
              className="w-full mt-1 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input 
              type="password" 
              className="w-full mt-1 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded text-lg font-medium"
          >
            Signup
          </button>
        </form>
        <p className="text-center mt-4 text-gray-400">
          Already have an account? 
          <Link to="/login" className="text-blue-400 hover:text-blue-300 ml-1">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;