import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, HeartPulse, Shield, ShoppingBag, ArrowRight, Activity, MessageCircleQuestion, Home, Clock, QrCode, Ticket, User, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import TutorialGuide from '../components/TutorialGuide';

const CareScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTutorial = new URLSearchParams(location.search).get('tutorial') === 'true';
  const [showTutorial, setShowTutorial] = useState(isTutorial);
  const [activeTab, setActiveTab] = useState('home');
  const [showBalance, setShowBalance] = useState(false);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingBottom: '80px', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '24px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div onClick={() => navigate(-1)} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F0EFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
               <ArrowLeft color="var(--primary)" size={20} />
            </div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--primary)', fontStyle: 'italic' }}>CENTRA <span style={{ color: '#1F1F1F', fontStyle: 'normal' }}>Care+</span></h2>
         </div>
         <div style={{ position: 'relative' }}>
            <Bell color="#1F1F1F" size={24} />
            <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FF4A4A', border: '2px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '10px', fontWeight: 'bold' }}>1</div>
         </div>
      </div>

      <div style={{ padding: '0 24px 24px' }}>
         {/* Greeting */}
         <h1 style={{ fontSize: '22px', color: '#1F1F1F', margin: '0 0 8px 0', fontWeight: '400' }}>
           Selamat datang, <span style={{ fontWeight: '800' }}>Ellyanna Filia!</span>
         </h1>
         <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#666', fontStyle: 'italic' }}>
           "Beralih ke digital, dapatkan lebih banyak manfaat"
         </p>

         {/* Balance Card */}
         <div id="tutorial-balance" style={{ 
           background: 'linear-gradient(135deg, #7A69E6 0%, #5144A5 100%)', 
           borderRadius: '40px', 
           padding: '32px 32px', 
           color: 'white',
           marginBottom: '32px',
           boxShadow: '0 16px 32px rgba(107, 93, 194, 0.3)'
         }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
               <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Saldo</p>
               <div onClick={() => setShowBalance(!showBalance)} style={{ cursor: 'pointer', padding: '6px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 {showBalance ? <EyeOff size={16} color="white" /> : <Eye size={16} color="white" />}
               </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
               <span style={{ fontSize: '20px', fontWeight: '600' }}>Rp</span>
               <span style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-1px' }}>
                 {showBalance ? '1.000.000' : '•••••••'}
               </span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
               <span style={{ opacity: 0.8, fontWeight: '400' }}>Poin: </span> {showBalance ? '2.450' : '••••'}
            </p>
         </div>

         {/* Promo Carousel */}
         <div id="tutorial-promo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#1F1F1F' }}>Spesial untuk Anda!</h3>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)', cursor: 'pointer' }}>Lihat Semua</span>
         </div>
         
         <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '24px', margin: '0 -24px', paddingLeft: '24px' }} className="hide-scrollbar">
            {/* Promo 1: Allianz */}
            <div style={{ minWidth: '180px', background: 'linear-gradient(180deg, rgba(107, 93, 194, 0.8) 0%, rgba(107, 93, 194, 1) 100%)', borderRadius: '32px', padding: '4px', color: 'white', position: 'relative' }}>
               <div style={{ backgroundColor: 'white', borderRadius: '28px', padding: '16px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src="/care/allianz.png" alt="Allianz" style={{ height: '24px', objectFit: 'contain' }} onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerHTML = '<span style="color:#1F1F1F; font-weight:800">Allianz</span>'; }} />
               </div>
               <div style={{ padding: '20px 16px', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 12px 0', fontSize: '12px', lineHeight: 1.4, opacity: 0.9 }}>Dapatkan potongan premi hingga</p>
                  <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800' }}>20%</h2>
               </div>
            </div>

            {/* Promo 2: Alfamart */}
            <div style={{ minWidth: '180px', background: 'linear-gradient(180deg, rgba(107, 93, 194, 0.7) 0%, rgba(107, 93, 194, 0.9) 100%)', borderRadius: '32px', padding: '4px', color: 'white', position: 'relative' }}>
               <div style={{ backgroundColor: 'white', borderRadius: '28px', padding: '16px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src="/care/alfamart.png" alt="Alfamart" style={{ height: '32px', objectFit: 'contain' }} onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerHTML = '<span style="color:#E52B38; font-weight:800">Alfamart</span>'; }} />
               </div>
               <div style={{ padding: '20px 16px', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 12px 0', fontSize: '12px', lineHeight: 1.4, opacity: 0.9 }}>Belanja sekarang, dapat cashback</p>
                  <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800' }}>50.000</h2>
               </div>
            </div>
            
            {/* Promo 3: Halodoc */}
            <div style={{ minWidth: '180px', background: 'linear-gradient(180deg, rgba(107, 93, 194, 0.6) 0%, rgba(107, 93, 194, 0.8) 100%)', borderRadius: '32px', padding: '4px', color: 'white', position: 'relative' }}>
               <div style={{ backgroundColor: 'white', borderRadius: '28px', padding: '16px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <h3 style={{ color: '#E52B38', margin: 0, fontSize: '20px', fontWeight: '800' }}>halodoc</h3>
               </div>
               <div style={{ padding: '20px 16px', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 12px 0', fontSize: '12px', lineHeight: 1.4, opacity: 0.9 }}>Konsultasi dokter spesialis</p>
                  <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800' }}>Gratis</h2>
               </div>
            </div>
         </div>

         {/* Dots */}
         <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '32px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D9D9D9' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D9D9D9' }} />
         </div>

         {/* Activity */}
         <div id="tutorial-activity" style={{ position: 'relative', marginBottom: '40px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: '800', color: '#1F1F1F', letterSpacing: '0.5px' }}>AKTIVITAS BULAN INI</h3>
            <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#333' }}>Transaksi online: 5x (naik 20% dari bulan lalu)</p>
            <p style={{ margin: 0, fontSize: '13px', color: '#333' }}>Poin terkumpul: <span style={{ color: 'var(--primary)', fontWeight: '700' }}>1.200</span></p>
         </div>

         {/* Partner Services */}
         <div id="tutorial-partner">
         <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: '#1F1F1F' }}>Layanan Terintegrasi</h3>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
           <div style={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', cursor: 'pointer', border: '1px solid #F0F0F0' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: '#FFF0F0', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '16px' }}>
                <HeartPulse color="#FF4A4A" size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: '#1F1F1F' }}>Kesehatan</h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Booking dokter & Beli Obat</p>
              </div>
              <ArrowRight color="#CCC" size={20} />
           </div>

           <div onClick={() => navigate('/belanja')} style={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', cursor: 'pointer', border: '1px solid #F0F0F0' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: '#F0EFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '16px' }}>
                <ShoppingBag color="var(--primary)" size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: '#1F1F1F' }}>Kebutuhan Harian</h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Belanja supermarket & cashback</p>
              </div>
              <ArrowRight color="#CCC" size={20} />
           </div>

           <div style={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', cursor: 'pointer', border: '1px solid #F0F0F0' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: '#E8F5E9', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '16px' }}>
                <Shield color="#4CAF50" size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: '#1F1F1F' }}>Asuransi</h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Beli premi & perlindungan</p>
              </div>
              <ArrowRight color="#CCC" size={20} />
           </div>
         </div>
         </div>
      </div>

      {/* Floating CITA specific for Care+ */}
      <div 
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '16px',
          zIndex: 1000,
        }}
      >
        <div style={{ position: 'relative' }}>
          <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'var(--primary)', boxShadow: '0 8px 24px rgba(107, 93, 194, 0.4)', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', border: '3px solid white' }}>
             <img src="/cita/cita.png" alt="CITA" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.4)' }} onError={(e) => e.target.style.display='none'} />
          </div>
          <svg viewBox="0 0 160 80" style={{ position: 'absolute', bottom: '-15px', left: '-25px', width: '140px', height: '70px', overflow: 'visible', pointerEvents: 'none', zIndex: 10 }}>
            <path id="curve" d="M 10 50 A 70 70 0 0 0 150 50" fill="transparent" />
            <text width="160" style={{ fontSize: '14px', fontWeight: '900', fill: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              <textPath href="#curve" startOffset="50%" textAnchor="middle">
                Butuh Bantuan?
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* Mock Bottom Navigation mimicking Dashboard */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '80px', backgroundColor: 'white', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', display: 'flex', justifyContent: 'space-between', padding: '0 16px', boxShadow: '0 -4px 20px rgba(0,0,0,0.05)', zIndex: 100
      }}>
        <div onClick={() => navigate('/dashboard')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', width: '60px', color: '#999' }}>
          <Home size={24} />
          <span style={{ fontSize: '11px', fontWeight: '600' }}>Beranda</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', width: '60px', color: '#999' }}>
          <Clock size={24} />
          <span style={{ fontSize: '11px', fontWeight: '600' }}>Riwayat</span>
        </div>
        
        {/* QRIS Button Mock */}
        <div style={{ position: 'relative', width: '60px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: '-24px', width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #7A69E6 0%, #5144A5 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 8px 16px rgba(107, 93, 194, 0.3)', border: '4px solid #FFFFFF', color: 'white', fontWeight: '900', fontSize: '14px', fontStyle: 'italic', letterSpacing: '1px', zIndex: 10 }}>
            QRIS
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', width: '60px', color: '#999' }}>
          <Ticket size={24} />
          <span style={{ fontSize: '11px', fontWeight: '600' }}>Promo</span>
        </div>
        <div onClick={() => navigate('/profile')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', width: '60px', color: '#999' }}>
          <User size={24} />
          <span style={{ fontSize: '11px', fontWeight: '600' }}>Profil</span>
        </div>
      </div>

      {showTutorial && (
         <TutorialGuide 
           steps={[
             { targetId: 'tutorial-balance', title: 'Kartu Saldo Care+', content: 'Ini adalah saldo dan poin khusus Anda di ekosistem CENTRA Care+ yang dapat digunakan untuk menikmati layanan partner.' },
             { targetId: 'tutorial-promo', title: 'Promo Spesial', content: 'Geser ke samping untuk melihat berbagai diskon dan cashback eksklusif dari partner kami seperti Allianz, Alfamart, dan Halodoc.' },
             { targetId: 'tutorial-activity', title: 'Aktivitas Transaksi', content: 'Pantau peningkatan transaksi online dan total poin yang berhasil Anda kumpulkan bulan ini.' },
             { targetId: 'tutorial-partner', title: 'Layanan Terintegrasi', content: 'Akses langsung berbagai layanan terintegrasi tanpa perlu keluar dari aplikasi CENTRA.' }
           ]} 
           onComplete={() => setShowTutorial(false)} 
         />
      )}
    </div>
  );
};

export default CareScreen;
