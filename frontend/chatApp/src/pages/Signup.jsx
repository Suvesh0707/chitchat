import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file)); // Show preview before upload
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar); 

      const response = await axios.post("http://localhost:3000/api/v1/register", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }, 
      });

      console.log("Signup Successful:", response.data);
      navigate("/homepage");
    } catch (error) {
      console.error("Signup Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="border border-gray-700 rounded-lg p-10 bg-gray-800 text-white w-96 shadow-lg shadow-primary">
        <h2 className="text-3xl font-semibold text-center mb-6">Signup</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input 
              type="text" 
              className="w-full mt-1 p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input 
              type="email" 
              className="w-full mt-1 p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
              placeholder="Password"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Profile Picture</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mt-1 p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none"
              required
            />
            {preview && (
              <img src={preview} alt="Avatar Preview" className="mt-2 w-20 h-20 rounded-full object-cover" />
            )}
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
