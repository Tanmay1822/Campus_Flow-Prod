import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const Alert = ({ message }) => (
  <div className="bg-bronco/10 text-bronco border border-bronco/20 px-4 py-3 rounded-lg mb-4 text-center font-medium">
    {message}
  </div>
);

const AuthPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isLogin) {
        const { data } = await axios.post(`${API_URL}/users/login`, {
          email,
          password,
        });
        onLoginSuccess(data);
      } else {
        const { data } = await axios.post(`${API_URL}/users`, {
          name,
          email,
          password,
        });
        onLoginSuccess(data);
      }
    } catch (err) {
      console.error('Auth error:', err);
      if (err.response?.status === 401 && isLogin) {
        setError("Invalid email or password.");
      } else if (err.response?.status === 400 && !isLogin) {
        setError(err.response?.data?.message || "User already exists or invalid data.");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(
          err.response?.data?.message || `An error occurred during ${isLogin ? 'login' : 'registration'}.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-creme flex flex-col items-center justify-center p-4 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-bronco mb-2 tracking-tight drop-shadow-sm">
          Campus Flow
        </h1>
        <p className="text-lg text-mesa-clay font-medium tracking-wide">
          Academic Management System
        </p>
      </div>

      <div className="max-w-md w-full bg-stone border border-bronco/10 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-bronco drop-shadow-sm">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        
        {error && <Alert message={error} />}
        
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-bronco/80 font-semibold mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mesa-clay/50 bg-white/50 text-bronco border border-bronco/20"
                required
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-bronco/80 font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mesa-clay/50 bg-white/50 text-bronco border border-bronco/20"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-bronco/80 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mesa-clay/50 bg-white/50 text-bronco border border-bronco/20"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-mesa-clay text-creme py-3 rounded-xl hover:bg-mesa-clay/90 shadow-md transition-all duration-300 font-bold disabled:bg-bronco/40"
            disabled={loading}
          >
            {loading ? (isLogin ? "Logging In..." : "Creating Account...") : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>
        
        <p className="text-center text-sm text-bronco/70 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="font-bold text-prairie-gold hover:text-mesa-clay transition-colors"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
