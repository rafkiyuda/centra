import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const ConfusionMonitor = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [showPopup, setShowPopup] = useState(false);
  
  // Exclude login/onboarding paths from monitoring
  const isExcludedRoute = ['/', '/auth', '/assessment'].includes(location.pathname);
  
  const idleTimeoutRef = useRef(null);
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef(null);
  const confusionScoreRef = useRef(0);

  const IDLE_TIME_LIMIT = 15000; // 15 seconds
  const CONFUSION_THRESHOLD = 50;

  const resetTimer = () => {
    if (isExcludedRoute) return;
    
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    
    // Only set idle timeout if we haven't already shown the popup
    if (!showPopup) {
      idleTimeoutRef.current = setTimeout(() => {
        setShowPopup(true);
      }, IDLE_TIME_LIMIT);
    }
  };

  const handleClick = () => {
    if (isExcludedRoute || showPopup) return;
    
    resetTimer();

    // Rapid click tracking
    clickCountRef.current += 1;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    
    clickTimeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1000);

    // If more than 3 clicks in 1 second, increase score
    if (clickCountRef.current > 3) {
      confusionScoreRef.current += 15;
      checkThreshold();
    }
  };

  const checkThreshold = () => {
    if (confusionScoreRef.current >= CONFUSION_THRESHOLD) {
      setShowPopup(true);
    }
  };

  // Setup global event listeners
  useEffect(() => {
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('keypress', resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [location.pathname, isExcludedRoute, showPopup]);

  // Route change tracking
  useEffect(() => {
    if (isExcludedRoute) return;
    confusionScoreRef.current += 10; // Increment slightly on route changes
    checkThreshold();
  }, [location.pathname]);

  const handleHelpAccept = () => {
    setShowPopup(false);
    confusionScoreRef.current = 0;
    navigate('/dashboard?openCita=true');
  };

  const handleHelpDecline = () => {
    setShowPopup(false);
    confusionScoreRef.current = 0;
    resetTimer();
  };

  return (
    <>
      {children}
      
      {/* Global Confusion Modal */}
      {showPopup && !isExcludedRoute && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="animate-fade-in" style={{ width: '85%', maxWidth: '340px', background: 'linear-gradient(135deg, #6B5DC2 0%, #A88BEB 100%)', borderRadius: '32px', padding: '32px 24px', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            
            <div onClick={handleHelpDecline} style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', border: '2px solid white' }}>
               <X color="white" size={16} />
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '24px', lineHeight: '1.4' }}>
              Sepertinya Anda<br/>mengalami kesulitan,<br/><br/>Apakah saya bisa<br/>membantu?
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onClick={handleHelpAccept}
                style={{ padding: '16px', borderRadius: '30px', backgroundColor: 'white', color: '#1F1F1F', fontWeight: '800', fontSize: '15px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              >
                Ya, Bantu Saya
              </button>
              <button 
                onClick={handleHelpDecline}
                style={{ padding: '16px', borderRadius: '30px', backgroundColor: 'white', color: '#1F1F1F', fontWeight: '800', fontSize: '15px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              >
                Tidak, Terima kasih
              </button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default ConfusionMonitor;
