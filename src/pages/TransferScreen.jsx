import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Search, Building2, User, ChevronRight, CheckCircle2, X } from 'lucide-react';
import TutorialGuide from '../components/TutorialGuide';

const TransferScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTutorial = new URLSearchParams(location.search).get('tutorial') === 'true';
  const [showTutorial, setShowTutorial] = useState(isTutorial);

  const [step, setStep] = useState(1); // 1: Dest, 2: Amount, 3: PIN, 4: Success
  
  // State data
  const [destination, setDestination] = useState(null);
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');

  // Dummy Contacts
  const recentContacts = [
    { name: 'Reza (Suami)', bank: 'BCA', account: '8729 0192 11', initial: 'R', color: '#FFB800' },
    { name: 'Budi (Kantor)', bank: 'Mandiri', account: '112 00 9821 213', initial: 'B', color: '#4CAF50' },
    { name: 'Rina (Kost)', bank: 'CENTRA', account: '0782 1111 2233', initial: 'R', color: '#6B5DC2' }
  ];

  const handleSelectContact = (contact) => {
    setDestination(contact);
    setStep(2);
  };

  const handleAmountSubmit = () => {
    if (amount && parseInt(amount) > 0) {
      setStep(3);
    }
  };

  const handlePinSubmit = () => {
    if (pin.length === 6) {
      // Simulate API call
      setTimeout(() => {
        setStep(4);
      }, 1000);
    }
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
  };

  // --- RENDERS ---

  const renderStep1 = () => (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>
      {/* Search Bar */}
      <div id="tutorial-search" style={{ position: 'relative', marginBottom: '32px' }}>
        <input 
          type="text" 
          placeholder="Cari nama, nomor rekening, atau bank" 
          style={{ width: '100%', padding: '16px 16px 16px 50px', borderRadius: '16px', border: '1px solid #EAEAEA', fontSize: '15px', backgroundColor: 'white', outline: 'none' }}
        />
        <Search color="#999" size={20} style={{ position: 'absolute', left: '16px', top: '18px' }} />
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#1F1F1F' }}>Kontak Tersimpan</h3>
      <div id="tutorial-recent" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {recentContacts.map((contact, idx) => (
          <div key={idx} onClick={() => handleSelectContact(contact)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'white', borderRadius: '16px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: contact.color, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: '700', fontSize: '18px' }}>
                {contact.initial}
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: '#1F1F1F' }}>{contact.name}</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>{contact.bank} • {contact.account}</p>
              </div>
            </div>
            <ChevronRight color="#CCC" size={20} />
          </div>
        ))}
      </div>
      
      <div id="tutorial-banks" style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#1F1F1F' }}>Bank Lainnya</h3>
        <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
           <Building2 color="var(--primary)" />
           <span style={{ fontWeight: '600' }}>Pilih Bank Tujuan</span>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
         <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: destination.color, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: '700', fontSize: '18px' }}>
            {destination.initial}
         </div>
         <div>
            <p style={{ margin: 0, fontSize: '12px', color: '#666', marginBottom: '4px' }}>Transfer ke</p>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1F1F1F' }}>{destination.name}</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#666', marginTop: '2px' }}>{destination.bank} • {destination.account}</p>
         </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>Nominal Transfer</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
          <span style={{ fontSize: '24px', fontWeight: '600', color: amount ? '#1F1F1F' : '#CCC' }}>Rp</span>
          <input 
            type="number" 
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ fontSize: '48px', fontWeight: '800', width: '200px', border: 'none', background: 'transparent', outline: 'none', color: '#1F1F1F', letterSpacing: '-1px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
           {[50000, 100000, 250000, 500000].map(val => (
             <button key={val} onClick={() => setAmount(val.toString())} style={{ padding: '10px 20px', borderRadius: '20px', border: '1px solid #EAEAEA', backgroundColor: 'white', color: 'var(--primary)', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
               {formatRupiah(val).replace('Rp', '')}
             </button>
           ))}
        </div>
      </div>

      <button 
        onClick={handleAmountSubmit}
        style={{ width: '100%', padding: '18px', borderRadius: '24px', backgroundColor: amount ? 'var(--primary)' : '#EAEAEA', color: amount ? 'white' : '#999', fontSize: '16px', fontWeight: '700', border: 'none', cursor: amount ? 'pointer' : 'not-allowed' }}
      >
        Lanjutkan
      </button>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)' }}>
       <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1F1F1F', textAlign: 'center', marginBottom: '12px' }}>Masukkan PIN</h2>
       <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginBottom: '40px' }}>Konfirmasi transfer sebesar <b>{formatRupiah(amount)}</b> ke <b>{destination.name}</b></p>
       
       <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
         {[1,2,3,4,5,6].map((_, i) => (
           <div key={i} style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: pin.length > i ? 'var(--primary)' : '#EAEAEA' }} />
         ))}
       </div>

       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '300px', margin: '0 auto' }}>
          {[1,2,3,4,5,6,7,8,9,'',0,'del'].map((key, i) => (
             <div key={i} 
                onClick={() => {
                  if (key === 'del') setPin(prev => prev.slice(0, -1));
                  else if (key !== '' && pin.length < 6) setPin(prev => prev + key);
                }}
                style={{ height: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '28px', fontWeight: '600', color: '#1F1F1F', cursor: key !== '' ? 'pointer' : 'default' }}>
                {key === 'del' ? <ArrowLeft /> : key}
             </div>
          ))}
       </div>

       <div style={{ marginTop: 'auto' }}>
          <button 
            onClick={handlePinSubmit}
            style={{ width: '100%', padding: '18px', borderRadius: '24px', backgroundColor: pin.length === 6 ? 'var(--primary)' : '#EAEAEA', color: pin.length === 6 ? 'white' : '#999', fontSize: '16px', fontWeight: '700', border: 'none', cursor: pin.length === 6 ? 'pointer' : 'not-allowed' }}
          >
            Konfirmasi
          </button>
       </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh)' }}>
       <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#00C853', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px' }}>
          <CheckCircle2 size={48} color="white" />
       </div>
       <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1F1F1F', marginBottom: '8px' }}>Transfer Berhasil!</h2>
       <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px' }}>Uang Anda sudah terkirim.</p>
       
       <div style={{ width: '100%', backgroundColor: 'white', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
             <span style={{ color: '#666', fontSize: '14px' }}>Penerima</span>
             <span style={{ fontWeight: '700', color: '#1F1F1F', fontSize: '14px' }}>{destination.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
             <span style={{ color: '#666', fontSize: '14px' }}>Rekening</span>
             <span style={{ fontWeight: '700', color: '#1F1F1F', fontSize: '14px' }}>{destination.bank} - {destination.account}</span>
          </div>
          <div style={{ width: '100%', height: '1px', backgroundColor: '#EAEAEA', margin: '24px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <span style={{ color: '#666', fontSize: '14px' }}>Nominal</span>
             <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '24px' }}>{formatRupiah(amount)}</span>
          </div>
       </div>

       <button 
          onClick={() => navigate('/dashboard')}
          style={{ width: '100%', padding: '18px', borderRadius: '24px', backgroundColor: 'var(--primary)', color: 'white', fontSize: '16px', fontWeight: '700', border: 'none', cursor: 'pointer' }}
        >
          Kembali ke Beranda
        </button>
    </div>
  );

  const tutorialSteps = [
    { targetId: 'tutorial-search', title: 'Pencarian Tujuan', content: 'Ketik nama kontak, nomor rekening, atau nama bank di sini untuk pencarian cepat.' },
    { targetId: 'tutorial-recent', title: 'Kontak Tersimpan', content: 'Orang-orang yang sering Anda transfer akan muncul di sini. Cukup sekali tap untuk kirim dana!' },
    { targetId: 'tutorial-banks', title: 'Daftar Bank', content: 'Anda juga bisa langsung memilih bank tujuan dari daftar ini untuk membuat transfer baru.' }
  ];

  return (
    <div style={{ backgroundColor: '#F8F9FE', minHeight: '100vh', paddingBottom: '40px', position: 'relative' }}>
      {showTutorial && step === 1 && (
         <TutorialGuide steps={tutorialSteps} onComplete={() => setShowTutorial(false)} />
      )}
      
      {step < 4 && (
        <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, backgroundColor: '#F8F9FE', zIndex: 10 }}>
          <div onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <ArrowLeft color="#1F1F1F" size={20} />
          </div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1F1F1F' }}>
            {step === 1 ? 'Transfer' : step === 2 ? 'Nominal Transfer' : 'Konfirmasi PIN'}
          </h2>
        </div>
      )}
      
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </div>
  );
};

export default TransferScreen;
