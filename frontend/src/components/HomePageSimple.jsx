import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePageSimple = ({ userInfo, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-creme flex flex-col items-center justify-center p-4 font-sans relative">
      
      {/* User Info & Logout */}
      {userInfo && (
        <div className="absolute top-4 right-4 flex items-center gap-4 bg-stone px-4 py-2 rounded-xl shadow-sm border border-bronco/10">
          <span className="text-bronco font-medium">
            Welcome, <span className="font-bold">{userInfo.name || "User"}</span>
          </span>
          <button
            onClick={onLogout}
            className="bg-bronco text-creme px-3 py-1 rounded-lg hover:bg-bronco/90 transition text-sm font-semibold shadow-sm"
          >
            Logout
          </button>
        </div>
      )}

      <div className="max-w-4xl w-full mt-16 md:mt-0">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-bronco mb-4 tracking-tight drop-shadow-sm">
            Campus Flow
          </h1>
          <p className="text-xl md:text-2xl text-mesa-clay font-medium tracking-wide mb-2">
            Academic Management System
          </p>
          <p className="text-lg text-bronco/70">
            Choose your preferred module to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Timetable Generator */}
          <div 
            className="group relative bg-stone border border-bronco/10 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-creme rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-bronco/10">
                <svg width="40" height="40" fill="none" stroke="currentColor" className="text-mesa-clay" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-bronco mb-4">
                Timetable Generator
              </h2>
              <p className="text-bronco/80 mb-8 leading-relaxed">
                Create and manage academic timetables with automated scheduling. 
                Add teachers, batches, and subjects to generate optimized timetables.
              </p>
              <button
                className="w-full bg-mesa-clay text-creme font-semibold py-3 px-6 rounded-xl transition-colors duration-300 hover:bg-mesa-clay/90 shadow-md"
                onClick={() => navigate('/timetable')}
              >
                Launch Timetable Generator
              </button>
            </div>
          </div>

          {/* Facial Recognition Attendance */}
          <div 
            className="group relative bg-stone border border-bronco/10 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-creme rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-bronco/10">
                <svg width="40" height="40" fill="none" stroke="currentColor" className="text-prairie-gold" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-bronco mb-4">
                Facial Recognition Attendance
              </h2>
              <p className="text-bronco/80 mb-8 leading-relaxed">
                Advanced attendance monitoring using facial recognition technology. 
                Take attendance with live camera or group photos, generate reports.
              </p>
              <button
                className="w-full bg-prairie-gold text-bronco font-bold py-3 px-6 rounded-xl transition-colors duration-300 hover:bg-prairie-gold/90 shadow-md"
                onClick={() => navigate('/facial-recognition')}
              >
                Launch Attendance Monitor
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-bronco/60 text-sm tracking-wide">
            Both modules share the same backend and user authentication system
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePageSimple;
