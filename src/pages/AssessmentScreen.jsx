import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data for the assessment questions
const questions = [
  {
    id: 1,
    question: "Seberapa percaya diri Anda menggunakan aplikasi keuangan digital?",
    subtitle: "Tenang, kami akan menyesuaikan tampilan agar terasa lebih nyaman.",
    options: [
      { text: "Sangat percaya diri", score: 3 },
      { text: "Cukup percaya diri", score: 2 },
      { text: "Masih membutuhkan bantuan", score: 1 },
    ]
  },
  {
    id: 2,
    question: "Seberapa sering Anda menggunakan mobile banking?",
    subtitle: "Pilih intensitas penggunaan Anda.",
    options: [
      { text: "Hampir setiap hari", score: 4 },
      { text: "Beberapa kali seminggu", score: 3 },
      { text: "Jarang", score: 2 },
      { text: "Belum pernah", score: 1 },
    ]
  },
  {
    id: 3,
    question: "Aktivitas apa yang paling sering Anda lakukan?",
    subtitle: "Pilih salah satu transaksi utama Anda.",
    options: [
      { text: "Transfer", score: 2 },
      { text: "Bayar tagihan", score: 2 },
      { text: "QRIS", score: 2 },
      { text: "Menabung/investasi", score: 2 },
    ]
  },
  {
    id: 4,
    question: "Saat mengalami kendala, biasanya Anda...",
    subtitle: "Informasi ini membantu kami menyiapkan bantuan yang tepat.",
    options: [
      { text: "Menyelesaikannya sendiri", score: 3 },
      { text: "Mencari bantuan keluarga", score: 1 },
      { text: "Menghubungi customer service", score: 2 },
    ]
  },
  {
    id: 5,
    question: "Placeholder for Step 5",
    subtitle: "",
    options: []
  }
];

const AssessmentScreen = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  
  // State for Step 5
  const [phoneNumber1, setPhoneNumber1] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState('');

  const currentQ = questions[currentStep];

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null && currentStep < 4) return; 

    // Save answer
    const newAnswers = { ...answers, [currentQ.id]: currentStep < 4 ? currentQ.options[selectedOption].score : (selectedOption === 0 ? 2 : 1) };
    setAnswers(newAnswers);
    setSelectedOption(null); // Reset for next question

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finished assessment
      calculateScoreAndNavigate(newAnswers);
    }
  };

  const calculateScoreAndNavigate = (finalAnswers) => {
    // Mode determination logic based on user answers
    const q1Score = finalAnswers[1]; // 1 = Masih membutuhkan bantuan
    const q2Score = finalAnswers[2]; // 2 = Jarang, 1 = Belum pernah
    
    const mode = (q1Score === 1 || q2Score <= 2) ? 'Assisted' : 'Independent';
    
    console.log("Assessment completed. Mode:", mode);
    localStorage.setItem('centra_mode', mode);
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const inputStyle = {
    width: '100%',
    padding: '16px',
    borderRadius: '24px',
    border: 'none',
    marginBottom: '12px',
    fontSize: '15px',
    fontWeight: '500',
    color: '#333',
    outline: 'none',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
  };

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: '#FFFFFF' }}>
      {currentStep < 4 ? (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1F1F1F', margin: 0, lineHeight: '1.2' }}>
            Halo,<br />
            Ellyanna Filia!
          </h2>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', position: 'relative' }}>
             <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: 'rgba(155, 142, 240, 0.4)',
              borderRadius: '50%',
              position: 'absolute',
              left: '-15px',
              top: '5px',
              zIndex: 0
            }}></div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#493C9B',
              fontStyle: 'italic',
              position: 'relative',
              zIndex: 1,
              margin: 0,
              lineHeight: '1.1',
              textAlign: 'center'
            }}>CENTRA<br/>Circle</h1>
          </div>
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#1F1F1F', textAlign: 'center', margin: 0, marginTop: '8px' }}>
            Ajak keluarga menjaga<br/>rekening Anda!
          </p>
        </div>
      )}

      <div className="assessment-card" style={currentStep === 4 ? { paddingTop: '32px' } : {}}>
        {currentStep < 4 ? (
          <>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.4' }}>
              {currentQ.question}
            </h3>
            {currentQ.subtitle && (
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', marginBottom: '24px', lineHeight: '1.5', fontWeight: '400' }}>
                {currentQ.subtitle}
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              {currentQ.options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`assessment-option ${selectedOption === index ? 'selected' : ''}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#1F1F1F',
                    borderRadius: '30px',
                    padding: '16px 20px',
                    border: selectedOption === index ? '2px solid #34C759' : '2px solid transparent',
                    fontWeight: '600',
                    fontSize: '16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedOption === index ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <input 
              type="text" 
              placeholder="nomor HP anak/cucu" 
              value={phoneNumber1}
              onChange={(e) => setPhoneNumber1(e.target.value)}
              style={inputStyle} 
            />
            <input 
              type="text" 
              placeholder="nomor cadangan (opsional)" 
              value={phoneNumber2}
              onChange={(e) => setPhoneNumber2(e.target.value)}
              style={inputStyle} 
            />
            
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '16px', marginBottom: '16px', textAlign: 'center', lineHeight: '1.4' }}>
              Bagaimana keluarga<br/>bisa ikut menjaga?
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => handleOptionSelect(0)}
                className={`assessment-option ${selectedOption === 0 ? 'selected' : ''}`}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#1F1F1F',
                  borderRadius: '24px',
                  padding: '12px',
                  border: selectedOption === 0 ? '2px solid #34C759' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedOption === 0 ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '4px' }}>Mode Notifikasi</div>
                <div style={{ fontWeight: '500', fontSize: '12px', color: '#666' }}>Anak akan dapat info transaksi</div>
              </button>
              <button
                onClick={() => handleOptionSelect(1)}
                className={`assessment-option ${selectedOption === 1 ? 'selected' : ''}`}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#1F1F1F',
                  borderRadius: '24px',
                  padding: '12px',
                  border: selectedOption === 1 ? '2px solid #34C759' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedOption === 1 ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '4px' }}>Mode Persetujuan</div>
                <div style={{ fontWeight: '500', fontSize: '12px', color: '#666' }}>Anak harus setujui transaksi {'>'}Rp5 juta</div>
              </button>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '24px', fontSize: '14px', opacity: 0.8 }}>
          {currentStep + 1} dari 5
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: 'auto', paddingTop: '24px' }}>
        <button 
          onClick={handleNext}
          disabled={selectedOption === null && currentStep < 4}
          style={{
            backgroundColor: (selectedOption !== null || currentStep === 4) ? '#6B5DC2' : '#B0A8E6',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            padding: '12px 24px',
            fontWeight: '700',
            fontSize: '16px',
            cursor: (selectedOption !== null || currentStep === 4) ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          LANJUT {'>'}{'>'}
        </button>
        
        {currentStep === 4 && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button 
              onClick={() => calculateScoreAndNavigate(answers)} 
              style={{ 
                background: 'none', 
                border: 'none', 
                textDecoration: 'underline', 
                color: '#1F1F1F', 
                fontWeight: '600', 
                fontSize: '15px',
                cursor: 'pointer',
                padding: '4px 8px'
              }}
            >
              Lewati
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentScreen;
