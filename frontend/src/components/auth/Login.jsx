import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../common/Alert';
import { API_URL } from '../../utils/constants';

const Login = ({ onLoginSuccess, onToggle, loading, setLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      onLoginSuccess(data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(err.response?.data?.message || "An error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6 text-bronco drop-shadow-sm">
        Welcome Back
      </h2>
      {error && <Alert message={error} />}
      <form onSubmit={submitHandler}>
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
          <label className="block text-bronco/80 font-semibold mb-1">Password</label>
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
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
      <p className="text-center text-sm text-bronco/70 mt-6">
        Don't have an account?{" "}
        <button
          onClick={onToggle}
          className="font-bold text-prairie-gold hover:text-mesa-clay transition-colors"
        >
          Register here
        </button>
      </p>
    </>
  );
};

export default Login;
