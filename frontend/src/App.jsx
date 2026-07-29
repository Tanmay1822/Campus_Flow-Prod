import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePageSimple from './components/HomePageSimple';
import TimetableApp from './components/TimetableApp';
import FacialRecognitionApp from './components/FacialRecognitionApp';
import AuthPage from './components/AuthPage';

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
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePageSimple userInfo={userInfo} onLogout={handleLogout} />} />
          <Route path="/timetable/*" element={<TimetableApp userInfo={userInfo} onLogout={handleLogout} />} />
          <Route path="/facial-recognition/*" element={<FacialRecognitionApp userInfo={userInfo} onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
