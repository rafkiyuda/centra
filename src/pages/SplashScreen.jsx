import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setIsLoading(true);
    
    // Simulate checking session and internet connection
    setTimeout(() => {
      const isSessionActive = false; // Simulated state
      
      if (isSessionActive) {
        navigate('/dashboard');
      } else {
        // According to requirements, this goes to Auth. 
        // For demonstration, we'll navigate to assessment if you want, 
        // but let's follow the requirement:
        navigate('/auth');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="page-container animate-fade-in" style={{
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      padding: '40px 24px'
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {/* Placeholder for Logo */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          {/* A styled text logo that mimics the provided image */}
          <div style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            backgroundColor: 'rgba(155, 142, 240, 0.6)',
            borderRadius: '50%',
            left: '-20px',
            top: '-15px',
            zIndex: 0
          }}></div>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            color: '#493C9B',
            fontStyle: 'italic',
            position: 'relative',
            zIndex: 1,
            margin: 0,
            letterSpacing: '2px'
          }}>CENTRA</h1>
        </div>
        <p style={{
          color: '#493C9B',
          fontWeight: '700',
          fontStyle: 'italic',
          fontSize: '18px',
          marginTop: '-5px'
        }}>by Centurion Bank</p>
      </div>

      <div style={{ width: '100%', maxWidth: '300px' }}>
        <button 
          className="btn btn-primary"
          onClick={handleStart}
          disabled={isLoading}
          style={{ width: '100%', padding: '16px' }}
        >
          {isLoading ? 'Memuat...' : 'Mulai'}
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
