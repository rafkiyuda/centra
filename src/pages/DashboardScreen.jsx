import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, Copy, EyeOff, Eye, Send, PlusCircle, Users, 
  ShoppingBag, Receipt, ShieldPlus, Menu, Home, User, 
  QrCode, MessageCircleQuestion, HeartPulse, Sparkles,
  ArrowUpRight, ArrowDownLeft, Smartphone,
  Mic, BookOpen, Video, X, Loader2, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px 16px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#8BC6EC',
        backgroundImage: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}>
         <div style={{ width: '20px', height: '20px', backgroundColor: '#FCD7B6', borderRadius: '50%', marginBottom: '20px' }}></div>
         <div style={{ width: '36px', height: '36px', backgroundColor: '#333', borderRadius: '18px 18px 0 0', position: 'absolute', bottom: '-10px' }}></div>
         
         <img 
           src="/profile/avatar.jpg" 
           alt="Profile" 
           style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
           onError={(e) => { e.target.style.display = 'none'; }}
         />
      </div>
      <div>
        <p style={{ fontSize: '14px', color: '#1F1F1F', margin: 0, marginBottom: '2px' }}>Halo,</p>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1F1F1F', margin: 0 }}>Ellyanna Filia!</h2>
      </div>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: 'rgba(155, 142, 240, 0.4)',
          borderRadius: '50%',
          position: 'absolute',
          left: '-8px',
          zIndex: 0
        }}></div>
        <span style={{ fontSize: '18px', fontWeight: '800', color: '#493C9B', fontStyle: 'italic', zIndex: 1 }}>
          CENTRA
        </span>
      </div>
      <button style={{ background: 'none', border: 'none', color: '#493C9B', cursor: 'pointer', position: 'relative' }}>
        <Bell size={24} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', backgroundColor: '#FF4A4A', borderRadius: '50%' }}></div>
      </button>
    </div>
  </div>
);

const QrisScannerModal = ({ onClose }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    // Try to aggressively force the back camera first
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } } })
      .catch(() => {
         // If exact fails (e.g. on laptops or some phones), try ideal
         return navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      })
      .catch(() => {
         // Final fallback to any available camera
         return navigator.mediaDevices.getUserMedia({ video: true });
      })
      .then(stream => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error("All camera access failed:", err);
      });

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="animate-fade-in" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'black', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <div style={{ padding: '24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <div onClick={onClose} style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
          <X color="white" size={24} />
        </div>
        <h2 style={{ color: 'white', margin: 0, fontSize: '18px', fontWeight: '700' }}>Scan QRIS</h2>
        <div style={{ width: '44px' }} /> {/* Spacer */}
      </div>

      {/* Scanner Viewport */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        
        {/* Semi-transparent overlay with a clear center cutout */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }} />
          <div style={{ display: 'flex', height: '280px' }}>
             <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }} />
             <div style={{ width: '280px', position: 'relative' }}>
                {/* Scanner Frame Brackets */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '40px', borderTop: '4px solid white', borderLeft: '4px solid white', borderTopLeftRadius: '24px' }}></div>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '40px', borderTop: '4px solid white', borderRight: '4px solid white', borderTopRightRadius: '24px' }}></div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '40px', borderBottom: '4px solid white', borderLeft: '4px solid white', borderBottomLeftRadius: '24px' }}></div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px', borderBottom: '4px solid white', borderRight: '4px solid white', borderBottomRightRadius: '24px' }}></div>
             </div>
             <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }} />
          </div>
          <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
             <p style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '24px', fontSize: '14px', fontWeight: '600', backdropFilter: 'blur(4px)' }}>
               Arahkan kamera ke kode QRIS
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BottomNav = () => {
  const navigate = useNavigate();
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
  <>
    {isScannerOpen && <QrisScannerModal onClose={() => setIsScannerOpen(false)} />}
    <div style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 40px 20px',
    boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    zIndex: 100
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: 'var(--primary)' }}>
      <Home size={28} />
      <span style={{ fontSize: '12px', fontWeight: '700' }}>Beranda</span>
    </div>
    
    <div 
      onClick={() => setIsScannerOpen(true)}
      style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      marginTop: '-36px',
      cursor: 'pointer'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'var(--bg-gradient)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 8px 16px rgba(107, 93, 194, 0.3)',
        border: '4px solid #FFFFFF'
      }}>
        <QrCode color="white" size={32} />
      </div>
    </div>
    
    <div 
      onClick={() => navigate('/profile')}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#A0A0A0' }}
    >
      <User size={28} />
      <span style={{ fontSize: '12px', fontWeight: '600' }}>Profil</span>
    </div>
  </div>
  </>
  );
};

const VideoCallModal = ({ onClose }) => {
  const [countdown, setCountdown] = useState(60);
  const [isCallActive, setIsCallActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsCallActive(true);
    }
  }, [countdown]);

  useEffect(() => {
    if (isCallActive) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("Camera access error:", err));
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCallActive]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      {!isCallActive ? (
        <div style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <Loader2 size={64} color="var(--primary-light)" className="animate-spin" style={{ marginBottom: '32px' }} />
           <h2 style={{ color: 'white', fontWeight: '800', fontSize: '24px', marginBottom: '16px' }}>Mencari Customer Service...</h2>
           <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px 32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.2)' }}>
             <p style={{ color: '#FFF', margin: 0, fontSize: '18px', fontWeight: '600' }}>Anda berada di antrean ke-1</p>
             <p style={{ color: 'var(--primary-light)', margin: '12px 0 0 0', fontSize: '32px', fontWeight: '800', fontFamily: 'monospace' }}>
               00:{countdown < 10 ? `0${countdown}` : countdown}
             </p>
             <p style={{ color: '#BBB', margin: '4px 0 0 0', fontSize: '14px' }}>Estimasi waktu tersambung</p>
           </div>
           <button onClick={() => setCountdown(0)} style={{ marginTop: '20px', padding: '8px 16px', borderRadius: '16px', border: '1px solid #666', backgroundColor: 'transparent', color: '#888', fontSize: '12px', cursor: 'pointer' }}>Skip (Mode Demo)</button>
           <button onClick={onClose} style={{ marginTop: '20px', padding: '16px 40px', borderRadius: '32px', border: 'none', backgroundColor: '#FF4A4A', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(255, 74, 74, 0.4)' }}>Batalkan</button>
        </div>
      ) : (
        <div className="animate-fade-in" style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#111' }}>
          {/* Main CS View (Simulated) */}
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
             <img src="/cita/cita.png" alt="CS" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
             <div style={{ position: 'absolute', bottom: '120px', textAlign: 'center' }}>
                <h3 style={{ color: 'white', fontSize: '20px', textShadow: '0 2px 4px rgba(0,0,0,0.5)', margin: 0 }}>CITA (Customer Service)</h3>
                <p style={{ color: '#00E676', fontWeight: '600', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Tersambung</p>
             </div>
          </div>

          {/* User PIP View (Webcam) */}
          <div style={{ 
            position: 'absolute', 
            top: '24px', 
            right: '24px', 
            width: '110px', 
            height: '160px', 
            backgroundColor: '#333', 
            borderRadius: '16px', 
            overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.5)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
          }}>
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Call Controls */}
          <div style={{ position: 'absolute', bottom: '40px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '24px' }}>
             <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(8px)' }}>
               <Mic color="white" size={24} />
             </div>
             <div onClick={onClose} style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#FF4A4A', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 4px 16px rgba(255, 74, 74, 0.4)' }}>
               <X color="white" size={32} />
             </div>
             <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(8px)' }}>
               <Video color="white" size={24} />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const VoiceCommandModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle'); // 'listening', 'processing', 'answering', 'error'
  const [transcript, setTranscript] = useState('');
  const [geminiResponse, setGeminiResponse] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
       setStatus('error');
       return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.continuous = false;
    recognition.interimResults = true;
    
    recognition.onstart = () => {
       setStatus('listening');
       setTranscript('');
       setGeminiResponse('');
    };
    
    recognition.onresult = (event) => {
      let currentTranscript = '';
      let isFinal = false;
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        currentTranscript += event.results[i][0].transcript;
        if (event.results[i].isFinal) isFinal = true;
      }
      setTranscript(currentTranscript);
      
      if (isFinal) {
         recognition.stop();
         processCommand(currentTranscript);
      }
    };
    
    recognition.onerror = (event) => {
       if (event.error === 'no-speech') return;
       setStatus('error');
    };
    
    recognition.start();

    return () => {
       recognition.stop();
       // Note: Intentionally NOT cancelling speechSynthesis here so the AI can continue talking while navigating
    };
  }, []);

  const processCommand = async (text) => {
    setStatus('processing');
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
         setGeminiResponse("Error: VITE_GEMINI_API_KEY belum diatur di .env");
         setStatus('answering');
         speakAnswer("Maaf, kunci API Gemini belum diatur di sistem.");
         return;
      }

      let navigateTo = null;
      let contextPrompt = "";
      const lowerText = text.toLowerCase();
      
      const knowledgeBase = `
[KNOWLEDGE BASE CENTRA APP]:
- Transfer: Transfer cepat & bebas biaya admin ke bank mana saja. Bisa transfer rekening, VA, dan bayar pakai QRIS.
- CENTRA Care+: Layanan integrasi kesehatan (konsultasi Halodoc, beli obat) dan asuransi dari Allianz/Prudential. Tidak perlu pindah aplikasi!
- Circle CENTRA: Terdiri dari 'Shared Pockets' untuk tabungan bersama (misal kado atau liburan), dan 'Split Bill' untuk otomatis menagih teman setelah makan bareng.
- Top Up: Isi saldo e-Wallet (GoPay, DANA, dll) dan beli pulsa/paket data dari provider apa saja.
- CENTRA Mall (Belanja): Ekosistem belanja online terintegrasi. Beli elektronik, baju, makanan langsung pakai Saldo CENTRA atau Poin.
- Bayar Tagihan: Bayar listrik PLN, air PDAM, internet, atau cicilan kartu kredit dengan pengingat pintar.
`;

      if (lowerText.includes('transfer') || lowerText.includes('kirim')) {
        navigateTo = '/transfer?tutorial=true';
        contextPrompt = " Beritahu pengguna bahwa Anda akan membuka halaman Transfer. Jelaskan sedikit kemudahan transfer di CENTRA.";
      } else if (lowerText.includes('care') || lowerText.includes('kesehatan') || lowerText.includes('asuransi')) {
        navigateTo = '/care?tutorial=true';
        contextPrompt = " Beritahu Anda akan membuka halaman CENTRA Care+. Jelaskan dengan hangat fitur luar biasa Care+ ini.";
      } else if (lowerText.includes('top up') || lowerText.includes('pulsa') || lowerText.includes('topup')) {
        navigateTo = '/topup?tutorial=true';
        contextPrompt = " Beritahu Anda akan membuka halaman Top Up. Sebutkan apa saja yang bisa ditop-up.";
      } else if (lowerText.includes('belanja') || lowerText.includes('mall') || lowerText.includes('keranjang')) {
        navigateTo = '/belanja?tutorial=true';
        contextPrompt = " Beritahu Anda akan membuka CENTRA Mall. Ajak pengguna menikmati pengalaman belanja yang mudah.";
      } else if (lowerText.includes('bayar') || lowerText.includes('tagihan') || lowerText.includes('listrik')) {
        navigateTo = '/bayar?tutorial=true';
        contextPrompt = " Beritahu Anda akan membuka halaman Tagihan. Tekankan bahwa bayar tagihan jadi bebas repot.";
      } else if (lowerText.includes('circle') || lowerText.includes('grup') || lowerText.includes('patungan') || lowerText.includes('split')) {
        navigateTo = '/circle?tutorial=true';
        contextPrompt = " Beritahu Anda akan membuka Circle CENTRA. Jelaskan serunya Split Bill atau Shared Pockets dengan teman.";
      }
      
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Anda adalah CITA, asisten AI cerdas, hangat, dan informatif untuk bank CENTRA. " + knowledgeBase + " Instruksi Khusus: Jawab permintaan berikut maksimal 3 kalimat saja. " + contextPrompt + " Permintaan: " + text }] }]
        })
      });
      
      const data = await res.json();
      if (data.candidates && data.candidates[0].content) {
         const answer = data.candidates[0].content.parts[0].text;
         setGeminiResponse(answer);
         speakAnswer(answer, navigateTo);
      } else if (data.error && data.error.message) {
         throw new Error(`API Error: ${data.error.message}`);
      } else {
         throw new Error("Invalid response format dari API Gemini");
      }
    } catch (e) {
      console.error(e);
      setGeminiResponse(`Terjadi Kesalahan: ${e.message || 'Jaringan bermasalah.'}`);
      setStatus('answering');
      speakAnswer("Maaf, terjadi kesalahan saat menghubungi server Gemini.");
    }
  };

  const speakAnswer = (text, navigateTo) => {
    setStatus('answering');
    const cleanText = text.replace(/[*_#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.pitch = 1.1; 
    window.speechSynthesis.speak(utterance);

    if (navigateTo) {
      setTimeout(() => {
        onClose(); // Close the modal
        navigate(navigateTo); // Automatically navigate while AI continues to speak
      }, 1500); // 1.5 seconds delay before navigating
    }
  };

  const handleClose = () => {
    window.speechSynthesis.cancel();
    onClose();
  };

  return (
    <div className="animate-fade-in" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '24px', textAlign: 'center' }}>
      
      {/* Icon Area */}
      <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: status === 'listening' ? 'rgba(255, 74, 74, 0.2)' : 'rgba(107, 93, 194, 0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '32px' }}>
         {status === 'processing' ? (
           <Loader2 size={48} color="var(--primary-light)" className="animate-spin" />
         ) : status === 'answering' ? (
           <Sparkles size={48} color="var(--primary-light)" />
         ) : (
           <div className="animate-pulse" style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: status === 'listening' ? '#FF4A4A' : '#6B5DC2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Mic size={40} color="white" />
           </div>
         )}
      </div>

      {/* Text Area */}
      {status === 'listening' && (
         <>
           <h2 style={{ color: 'white', fontWeight: '800', fontSize: '24px', marginBottom: '8px' }}>Mendengarkan...</h2>
           <p style={{ color: '#DDD', fontSize: '18px', lineHeight: '1.5', minHeight: '60px' }}>
             {transcript ? `"${transcript}"` : "Sebutkan perintah Anda..."}
           </p>
         </>
      )}
      
      {status === 'processing' && (
         <>
           <h2 style={{ color: 'white', fontWeight: '800', fontSize: '24px', marginBottom: '8px' }}>Memproses...</h2>
           <p style={{ color: '#DDD', fontSize: '18px', lineHeight: '1.5', minHeight: '60px', fontStyle: 'italic' }}>
             "{transcript}"
           </p>
         </>
      )}

      {status === 'answering' && (
         <div className="animate-fade-in" style={{ backgroundColor: 'white', borderRadius: '24px', padding: '24px', maxWidth: '340px', boxShadow: '0 8px 32px rgba(107, 93, 194, 0.3)' }}>
            <p style={{ color: 'var(--primary)', fontWeight: '700', margin: '0 0 12px 0', fontSize: '14px' }}>CITA Menjawab:</p>
            <p style={{ color: '#1F1F1F', fontSize: '16px', lineHeight: '1.6', margin: 0, fontWeight: '600' }}>
              {geminiResponse}
            </p>
         </div>
      )}
      
      {status === 'error' && (
         <>
           <h2 style={{ color: '#FF4A4A', fontWeight: '800', fontSize: '24px', marginBottom: '8px' }}>Gagal Memproses</h2>
           <p style={{ color: '#DDD', fontSize: '16px' }}>Browser Anda tidak mendukung fitur Suara, atau akses mikrofon ditolak.</p>
         </>
      )}

      {/* Close Button */}
      <button onClick={handleClose} style={{ marginTop: '60px', padding: '14px 40px', borderRadius: '30px', border: '2px solid rgba(255,255,255,0.3)', backgroundColor: 'transparent', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
        {status === 'answering' ? 'Tutup' : 'Batal'}
      </button>
    </div>
  );
};

const FloatingCita = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleAction = (action) => {
    setActiveModal(action);
    setIsOpen(false);
  };

  const closeModal = () => setActiveModal(null);

  return (
    <>
      {/* Full-screen Modals */}
      {activeModal === 'voice' && <VoiceCommandModal onClose={closeModal} />}

      {activeModal === 'video' && <VideoCallModal onClose={closeModal} />}

      {activeModal === 'guide' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
           <div className="animate-fade-in" style={{ backgroundColor: 'white', padding: '32px 24px', borderRadius: '32px', width: '100%', maxWidth: '340px', textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}>
             <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#F0EFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px' }}>
               <BookOpen size={40} color="var(--primary)" />
             </div>
             <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: '800', color: '#1F1F1F' }}>Pilih Panduan</h3>
             <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px', lineHeight: '1.6' }}>Pilih fitur mana yang ingin Anda pelajari secara langsung.</p>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
               <button onClick={() => { closeModal(); navigate('/transfer?tutorial=true'); }} style={{ padding: '16px', borderRadius: '16px', border: '1px solid #EAEAEA', backgroundColor: 'white', color: 'var(--primary)', fontWeight: '700', fontSize: '15px', width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span>Panduan Transfer</span> <ArrowRight size={18} />
               </button>
               <button onClick={() => { closeModal(); navigate('/topup?tutorial=true'); }} style={{ padding: '16px', borderRadius: '16px', border: '1px solid #EAEAEA', backgroundColor: 'white', color: 'var(--primary)', fontWeight: '700', fontSize: '15px', width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span>Panduan Top Up</span> <ArrowRight size={18} />
               </button>
               <button onClick={() => { closeModal(); navigate('/circle?tutorial=true'); }} style={{ padding: '16px', borderRadius: '16px', border: '1px solid #EAEAEA', backgroundColor: 'white', color: 'var(--primary)', fontWeight: '700', fontSize: '15px', width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span>Panduan Circle CENTRA</span> <ArrowRight size={18} />
               </button>
               <button onClick={() => { closeModal(); navigate('/care?tutorial=true'); }} style={{ padding: '16px', borderRadius: '16px', border: '1px solid #EAEAEA', backgroundColor: 'white', color: 'var(--primary)', fontWeight: '700', fontSize: '15px', width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span>Panduan Care+</span> <ArrowRight size={18} />
               </button>
               <button onClick={() => { closeModal(); navigate('/belanja?tutorial=true'); }} style={{ padding: '16px', borderRadius: '16px', border: '1px solid #EAEAEA', backgroundColor: 'white', color: 'var(--primary)', fontWeight: '700', fontSize: '15px', width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span>Panduan Belanja (Mall)</span> <ArrowRight size={18} />
               </button>
               <button onClick={() => { closeModal(); navigate('/bayar?tutorial=true'); }} style={{ padding: '16px', borderRadius: '16px', border: '1px solid #EAEAEA', backgroundColor: 'white', color: 'var(--primary)', fontWeight: '700', fontSize: '15px', width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span>Panduan Bayar Tagihan</span> <ArrowRight size={18} />
               </button>
             </div>

             <button onClick={closeModal} style={{ padding: '16px 24px', borderRadius: '24px', border: 'none', backgroundColor: '#F0EFFF', color: 'var(--primary)', fontWeight: '700', fontSize: '15px', width: '100%', cursor: 'pointer' }}>Tutup</button>
           </div>
        </div>
      )}

      {/* Backdrop for FAB Menu */}
      {isOpen && (
        <div onClick={toggleMenu} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)', zIndex: 9, backdropFilter: 'blur(2px)' }} />
      )}

      {/* FAB Container */}
      <div style={{
        position: 'absolute',
        bottom: '100px',
        right: '16px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}>
        
        {/* Expanded Menu Options */}
        {isOpen && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px', alignItems: 'flex-end', paddingRight: '8px' }}>
            
            {/* Option 3: Video Call */}
            <div onClick={() => handleAction('video')} style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
              <span style={{ backgroundColor: 'white', padding: '10px 16px', borderRadius: '16px', fontSize: '14px', fontWeight: '700', color: '#1F1F1F', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>Video Call CS</span>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#493C9B', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 6px 16px rgba(107, 93, 194, 0.3)' }}>
                <Video size={24} color="white" />
              </div>
            </div>

            {/* Option 2: Panduan */}
            <div onClick={() => handleAction('guide')} style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
              <span style={{ backgroundColor: 'white', padding: '10px 16px', borderRadius: '16px', fontSize: '14px', fontWeight: '700', color: '#1F1F1F', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>Panduan Aplikasi</span>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#493C9B', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 6px 16px rgba(107, 93, 194, 0.3)' }}>
                <BookOpen size={24} color="white" />
              </div>
            </div>

            {/* Option 1: Voice */}
            <div onClick={() => handleAction('voice')} style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
              <span style={{ backgroundColor: 'white', padding: '10px 16px', borderRadius: '16px', fontSize: '14px', fontWeight: '700', color: '#1F1F1F', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>Voice Command</span>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#493C9B', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 6px 16px rgba(107, 93, 194, 0.3)' }}>
                <Mic size={24} color="white" />
              </div>
            </div>

          </div>
        )}

        {/* Main CITA Button */}
        <div 
          onClick={toggleMenu}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'var(--bg-gradient)',
            boxShadow: isOpen ? '0 8px 16px rgba(107, 93, 194, 0.3)' : '0 12px 28px rgba(107, 93, 194, 0.5), inset 0 -4px 8px rgba(0,0,0,0.15), inset 0 4px 8px rgba(255,255,255,0.5)',
            cursor: 'pointer',
            border: isOpen ? 'none' : '2px solid white',
            position: 'relative',
            transform: isOpen ? 'scale(0.8)' : 'scale(1)',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          {isOpen ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF4A4A', borderRadius: '50%' }}>
               <X size={48} color="white" />
            </div>
          ) : (
            <>
              {/* Inner container to clip the image to the circle */}
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', position: 'absolute', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <MessageCircleQuestion color="white" size={48} />
                <img 
                  src="/cita/cita.png" 
                  alt="CITA Assistant"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, transform: 'scale(1.4)' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>

              {/* SVG Curved Text Sticker Overflowing the bottom */}
              <svg 
                viewBox="0 0 160 80" 
                style={{ 
                  position: 'absolute', 
                  bottom: '-15px', 
                  left: '-20px',
                  width: '140px', 
                  height: '70px',
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 3px 4px rgba(0,0,0,0.15))',
                  pointerEvents: 'none'
                }}
              >
                <path id="curve1" d="M 0 40 Q 80 65 160 40" fill="transparent" />
                <path id="curve2" d="M 20 60 Q 80 80 140 60" fill="transparent" />
                
                {/* BUTUH BANTUAN */}
                <text>
                  <textPath href="#curve1" startOffset="50%" textAnchor="middle" fill="#493C9B" stroke="white" strokeWidth="6" strokeLinejoin="round" paintOrder="stroke" style={{ fontSize: '18px', fontWeight: '900', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.5px' }}>
                    BUTUH BANTUAN
                  </textPath>
                </text>
                
                {/* DARI CITA? */}
                <text>
                  <textPath href="#curve2" startOffset="50%" textAnchor="middle" fill="#493C9B" stroke="white" strokeWidth="6" strokeLinejoin="round" paintOrder="stroke" style={{ fontSize: '18px', fontWeight: '900', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.5px' }}>
                    DARI CITA?
                  </textPath>
                </text>
              </svg>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const IndependentMode = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);

  return (
    <>
      <div style={{ padding: '0 24px' }}>
        {/* Balance Card */}
        <div style={{
          background: 'var(--bg-gradient)',
          borderRadius: '24px',
          padding: '24px',
          color: 'white',
          boxShadow: '0 8px 24px rgba(107, 93, 194, 0.25)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p style={{ fontSize: '13px', margin: 0, opacity: 0.9 }}>No Rekening - 0782 7820 8092</p>
            <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, opacity: 0.9 }}>
              <Copy size={16} />
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: '600' }}>Rp</span>
              <span style={{ fontSize: '36px', fontWeight: '700', letterSpacing: '-1px' }}>
                {showBalance ? '1.000.000' : '••••••••'}
              </span>
            </div>
            <button 
              onClick={() => setShowBalance(!showBalance)}
              style={{ 
                background: 'rgba(255,255,255,0.2)', 
                border: 'none', 
                color: 'white', 
                cursor: 'pointer', 
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Main Menu (Grid) */}
        <div style={{ marginTop: '28px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>Menu Utama</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '16px 12px' 
          }}>
            {[
              { icon: <Send size={24} color="var(--primary)" />, label: 'Transfer', route: '/transfer' },
              { icon: <PlusCircle size={24} color="var(--primary)" />, label: 'Top-up', route: '/topup' },
              { icon: <Users size={24} color="var(--primary)" />, label: 'Circle', route: '/circle' },
              { icon: <ShoppingBag size={24} color="var(--primary)" />, label: 'Belanja', route: '/belanja' },
              { icon: <Receipt size={24} color="var(--primary)" />, label: 'Bayar', route: '/bayar' },
              { icon: <ShieldPlus size={24} color="var(--primary)" />, label: 'Care+', route: '/care' },
              { icon: <Receipt size={24} color="var(--primary)" />, label: 'Tagihan', route: '/bayar' },
              { icon: <Menu size={24} color="var(--primary)" />, label: 'Lainnya', route: '#' }
            ].map((menu, idx) => (
              <div key={idx} onClick={() => menu.route !== '#' && navigate(menu.route)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  border: '1.5px solid #E5E0FA',
                  backgroundColor: '#F8F6FF',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}>
                  {menu.icon}
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#1F1F1F', textAlign: 'center' }}>
                  {menu.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offers Section */}
        <div style={{ marginTop: '32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', margin: 0 }}>Spesial untuk Anda!</h3>
            <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
              Lihat Semua
            </button>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            overflowX: 'auto', 
            paddingBottom: '16px',
            marginRight: '-24px', 
            paddingRight: '24px'
          }}>
            <div style={{
              minWidth: '220px',
              height: '140px',
              background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
              borderRadius: '24px',
              flexShrink: 0,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(255, 154, 158, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <HeartPulse size={64} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', right: '-10px', bottom: '-10px' }} />
              <div>
                <span style={{ backgroundColor: 'white', color: '#FF758C', fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '12px', display: 'inline-block', marginBottom: '8px' }}>
                  CENTRA Care+
                </span>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#D9385E', lineHeight: '1.2' }}>Diskon 30%<br/>Check-up RS</h4>
              </div>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: '#D9385E' }}>Gunakan poin Anda</p>
            </div>

            <div style={{
              minWidth: '220px',
              height: '140px',
              background: 'linear-gradient(135deg, #84FAB0 0%, #8FD3F4 100%)',
              borderRadius: '24px',
              flexShrink: 0,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(132, 250, 176, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <ShoppingBag size={64} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', right: '-10px', bottom: '-10px' }} />
              <div>
                <span style={{ backgroundColor: 'white', color: '#4FACFE', fontSize: '10px', fontWeight: '800', padding: '4px 8px', borderRadius: '12px', display: 'inline-block', marginBottom: '8px' }}>
                  Kebutuhan Harian
                </span>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#007B99', lineHeight: '1.2' }}>Cashback<br/>Rp 50.000</h4>
              </div>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: '#007B99' }}>Belanja di Supermarket</p>
            </div>
            <div style={{ minWidth: '8px' }}></div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div style={{ marginBottom: '20px' }}>
           <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>Transaksi Terakhir</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#F8F9FE', borderRadius: '16px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E5E0FA', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                   <ArrowUpRight size={20} color="var(--primary)" />
                 </div>
                 <div>
                   <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1F1F1F' }}>Transfer ke Budi (Anak)</p>
                   <p style={{ margin: 0, fontSize: '12px', color: '#666', marginTop: '2px' }}>Hari ini, 09:41</p>
                 </div>
               </div>
               <span style={{ fontSize: '14px', fontWeight: '700', color: '#1F1F1F' }}>-Rp 250.000</span>
             </div>
           </div>
        </div>
      </div>
    </>
  );
};

const AssistedMode = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(false);
  return (
    <>
      {/* Floating Mode Indicator on the Left */}
      <div style={{
        position: 'absolute',
        top: '250px',
        left: '0',
        zIndex: 50,
        backgroundColor: '#EAEAEA',
        padding: '12px 6px',
        borderTopRightRadius: '16px',
        borderBottomRightRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '2px 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#00C853' }}></div>
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '12px', fontWeight: '600', color: '#333', letterSpacing: '1px' }}>
          Mode Mudah Aktif
        </span>
      </div>

      <div style={{ padding: '0 24px', flex: 1 }}>
        {/* Large Balance Card */}
        <div style={{
          background: 'var(--bg-gradient)',
          borderRadius: '32px',
          padding: '32px 24px',
          color: 'white',
          boxShadow: '0 12px 30px rgba(107, 93, 194, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 20px', marginBottom: '8px' }}>
            <p style={{ fontSize: '16px', margin: 0, opacity: 0.9 }}>Saldo Anda:</p>
            <div onClick={() => setShowBalance(!showBalance)} style={{ cursor: 'pointer', padding: '8px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}>
              {showBalance ? <EyeOff size={20} color="white" /> : <Eye size={20} color="white" />}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '32px' }}>
            <span style={{ fontSize: '24px', fontWeight: '600' }}>Rp</span>
            <span style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-1px' }}>
              {showBalance ? '1.000.000' : '•••••••'}
            </span>
          </div>

          {/* Large Main Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <div onClick={() => navigate('/transfer?tutorial=true')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Send size={28} color="white" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Transfer</span>
            </div>
            <div onClick={() => navigate('/topup?tutorial=true')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PlusCircle size={28} color="white" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Top-up</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Menu size={28} color="white" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Lainnya</span>
            </div>
          </div>
        </div>

        {/* Quick Menu (Menu Cepat) */}
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px' }}>Menu Cepat</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Pill 1 */}
            <div onClick={() => navigate('/transfer?tutorial=true')} style={{ backgroundColor: '#F4F4F4', borderRadius: '30px', padding: '8px 16px 8px 8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFD180', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                 {/* Avatar placeholder */}
                 <div style={{ width: '16px', height: '16px', backgroundColor: '#333', borderRadius: '50%', marginBottom: '12px' }}></div>
                 <div style={{ width: '28px', height: '28px', backgroundColor: '#A84232', borderRadius: '14px 14px 0 0', position: 'absolute', bottom: '-8px' }}></div>
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F1F1F', lineHeight: '1.2' }}>Transfer<br/>ke Reza</span>
            </div>
            
            {/* Pill 2 */}
            <div onClick={() => navigate('/topup')} style={{ backgroundColor: '#F4F4F4', borderRadius: '30px', padding: '8px 16px 8px 8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#264653', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <Smartphone size={18} color="white" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F1F1F', lineHeight: '1.2' }}>Isi pulsa</span>
            </div>

            {/* Pill 3 */}
            <div onClick={() => navigate('/topup')} style={{ backgroundColor: '#F4F4F4', borderRadius: '30px', padding: '8px 16px 8px 8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#00A8E8', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <div style={{ width: '20px', height: '14px', backgroundColor: 'white', borderRadius: '4px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '4px', right: '-2px', width: '8px', height: '6px', backgroundColor: '#00A8E8', borderRadius: '2px' }}></div>
                 </div>
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F1F1F', lineHeight: '1.2' }}>Top up<br/>e-wallet</span>
            </div>

            {/* Pill 4 */}
            <div onClick={() => navigate('/topup')} style={{ backgroundColor: '#F4F4F4', borderRadius: '30px', padding: '8px 16px 8px 8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#264653', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <Smartphone size={18} color="white" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F1F1F', lineHeight: '1.2' }}>Isi paket</span>
            </div>
          </div>
          
          {/* Dots Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#6B5DC2' }}></div>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E0E0E0' }}></div>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E0E0E0' }}></div>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E0E0E0' }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

const DashboardScreen = () => {
  const navigate = useNavigate();
  // Read mode from localStorage, default to Independent
  const mode = localStorage.getItem('centra_mode') || 'Independent';

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#FFFFFF', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      {/* Scrollable Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '120px' }}>
        <Header />
        {mode === 'Assisted' ? <AssistedMode /> : <IndependentMode />}
      </div>

      <FloatingCita />
      <BottomNav />
    </div>
  );
};

export default DashboardScreen;
