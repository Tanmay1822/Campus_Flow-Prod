import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const LoginPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleMode = () => setIsLogin(!isLogin);

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
        {isLogin ? (
          <Login onLoginSuccess={onLoginSuccess} onToggle={toggleMode} loading={loading} setLoading={setLoading} />
        ) : (
          <Register onLoginSuccess={onLoginSuccess} onToggle={toggleMode} loading={loading} setLoading={setLoading} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
