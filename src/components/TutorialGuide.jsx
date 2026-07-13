import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle2, X } from 'lucide-react';

const TutorialGuide = ({ steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);

  useEffect(() => {
    // A function to update the rect based on the current step's target
    const updateRect = () => {
      if (!steps || steps.length === 0) return;
      
      const targetId = steps[currentStep]?.targetId;
      if (!targetId) return;

      const el = document.getElementById(targetId);
      if (el) {
        // Scroll element into view with some padding
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Wait a tiny bit for scroll to finish, then get bounding rect
        setTimeout(() => {
           const rect = el.getBoundingClientRect();
           setTargetRect({
             top: rect.top,
             left: rect.left,
             width: rect.width,
             height: rect.height,
           });
        }, 300); // 300ms delay to allow scrolling
      }
    };

    updateRect();
    
    // Add resize listener just in case
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [currentStep, steps]);

  if (!steps || steps.length === 0 || !targetRect) return null;

  const currentData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      if (onComplete) onComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Tooltip positioning logic
  const isTooltipAbove = targetRect.top > window.innerHeight / 2;
  const tooltipTop = isTooltipAbove ? targetRect.top - 16 : targetRect.top + targetRect.height + 16;
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, pointerEvents: 'auto' }}>
      {/* The Highlight Cutout utilizing large box-shadow to darken the rest of the screen */}
      <div 
        style={{
          position: 'absolute',
          top: targetRect.top - 8,
          left: targetRect.left - 8,
          width: targetRect.width + 16,
          height: targetRect.height + 16,
          borderRadius: '16px',
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
          transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          pointerEvents: 'none', // Allow clicks to pass through the hole if needed
          zIndex: 10000
        }}
      />

      {/* Tooltip Dialog */}
      <div 
        style={{
          position: 'absolute',
          top: tooltipTop,
          left: '50%',
          transform: `translate(-50%, ${isTooltipAbove ? '-100%' : '0'})`,
          width: '90%',
          maxWidth: '340px',
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
          zIndex: 10001,
          transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          opacity: 1
        }}
      >
         {/* Close Button */}
         <div onClick={() => onComplete && onComplete()} style={{ position: 'absolute', top: '16px', right: '16px', cursor: 'pointer', color: '#999' }}>
            <X size={20} />
         </div>

         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ padding: '4px 10px', backgroundColor: '#F0EFFF', color: 'var(--primary)', borderRadius: '12px', fontSize: '12px', fontWeight: '800' }}>
              {currentStep + 1} / {steps.length}
            </div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#1F1F1F' }}>{currentData.title}</h3>
         </div>
         <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
            {currentData.content}
         </p>
         
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
               {steps.map((_, idx) => (
                 <div key={idx} style={{ width: idx === currentStep ? '16px' : '6px', height: '6px', borderRadius: '4px', backgroundColor: idx === currentStep ? 'var(--primary)' : '#EAEAEA', transition: 'all 0.3s' }} />
               ))}
            </div>
            <button 
              onClick={handleNext}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '10px 20px', borderRadius: '20px', backgroundColor: 'var(--primary)', color: 'white', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(107, 93, 194, 0.3)' }}
            >
              {isLastStep ? 'Selesai' : 'Lanjut'}
              {isLastStep ? <CheckCircle2 size={16} /> : <ChevronRight size={16} />}
            </button>
         </div>
      </div>
    </div>
  );
};

export default TutorialGuide;
