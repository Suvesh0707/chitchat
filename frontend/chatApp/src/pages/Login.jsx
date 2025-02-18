import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post( 
        "http://localhost:3000/api/v1/login",
        { email, password },
        {withCredentials: true}
      );
      console.log("Login Successful:", response.data);
      navigate("/homepage");
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="border border-gray-700 rounded-lg shadow-lg shadow-primary p-10 bg-gray-800 text-white w-96 min-h-[450px] flex flex-col justify-center">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input 
              type="email"
              className="w-full mt-1 p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded text-lg font-medium"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-400">
          Don't have an account? 
          <Link to="/" className="text-blue-400 hover:text-blue-300 ml-1">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
