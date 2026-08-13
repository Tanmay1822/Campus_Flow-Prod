import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import TimetablePage from './pages/TimetablePage';
import AttendancePage from './pages/AttendancePage';
import LoginPage from './pages/LoginPage';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      try {
        setUserInfo(JSON.parse(storedUserInfo));
      } catch (error) {
        console.error('Error parsing user info:', error);
        localStorage.removeItem("userInfo");
      }
    }
  }, []);

  const handleLoginSuccess = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUserInfo(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  if (!userInfo) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<DashboardPage userInfo={userInfo} onLogout={handleLogout} />} />
          <Route path="/timetable/*" element={<TimetablePage userInfo={userInfo} onLogout={handleLogout} />} />
          <Route path="/facial-recognition/*" element={<AttendancePage userInfo={userInfo} onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
