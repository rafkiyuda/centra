import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Wallet, Smartphone, ChevronRight, CheckCircle2 } from 'lucide-react';

const TopUpScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Select Service, 2: Number, 3: Amount, 4: PIN, 5: Success
  
  // State data
  const [service, setService] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');

  // Dummy Services
  const eWallets = [
    { id: 'gopay', name: 'GoPay', type: 'e-Wallet', color: '#00AED6' },
    { id: 'ovo', name: 'OVO', type: 'e-Wallet', color: '#4C3494' },
    { id: 'dana', name: 'DANA', type: 'e-Wallet', color: '#118EE9' },
    { id: 'shopeepay', name: 'ShopeePay', type: 'e-Wallet', color: '#EE4D2D' }
  ];

  const pulsaProviders = [
    { id: 'telkomsel', name: 'Telkomsel', type: 'Pulsa', color: '#EC2028' },
    { id: 'indosat', name: 'Indosat Ooredoo', type: 'Pulsa', color: '#FFCC00' },
    { id: 'xl', name: 'XL Axiata', type: 'Pulsa', color: '#005BAB' }
  ];

  const handleSelectService = (item) => {
    setService(item);
    setStep(2);
  };

  const handleNumberSubmit = () => {
    if (phoneNumber.length > 8) {
      setStep(3);
    }
  };

  const handleAmountSubmit = () => {
    if (amount && parseInt(amount) > 0) {
      setStep(4);
    }
  };

  const handlePinSubmit = () => {
    if (pin.length === 6) {
      setTimeout(() => {
        setStep(5);
      }, 1000);
    }
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
  };

  // --- RENDERS ---

  const renderStep1 = () => (
    <div className="animate-fade-in" style={{ padding: '24px' }}>
      <div style={{ position: 'relative', marginBottom: '32px' }}>
        <input 
          type="text" 
          placeholder="Cari e-Wallet atau Provider Pulsa" 
          style={{ width: '100%', padding: '16px 16px 16px 50px', borderRadius: '16px', border: '1px solid #EAEAEA', fontSize: '15px', backgroundColor: 'white', outline: 'none' }}
        />
        <Search color="#999" size={20} style={{ position: 'absolute', left: '16px', top: '18px' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Wallet color="var(--primary)" size={20} />
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1F1F1F' }}>e-Wallet</h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {eWallets.map((item) => (
          <div key={item.id} onClick={() => handleSelectService(item)} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
             <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: item.color, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: '800', fontSize: '16px' }}>
                {item.name[0]}
             </div>
             <span style={{ fontWeight: '600', fontSize: '14px', color: '#333' }}>{item.name}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Smartphone color="var(--primary)" size={20} />
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1F1F1F' }}>Pulsa & Paket Data</h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '12px' }}>
        {pulsaProviders.map((item) => (
          <div key={item.id} onClick={() => handleSelectService(item)} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: item.color, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: '800', fontSize: '16px' }}>
                  {item.name[0]}
               </div>
               <span style={{ fontWeight: '600', fontSize: '15px', color: '#333' }}>{item.name}</span>
             </div>
             <ChevronRight color="#CCC" size={20} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
         <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: service.color, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: '800', fontSize: '24px' }}>
            {service.name[0]}
         </div>
         <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1F1F1F' }}>{service.name}</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Top Up {service.type}</p>
         </div>
      </div>

      <div style={{ flex: 1 }}>
         <p style={{ color: '#1F1F1F', fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Nomor Tujuan</p>
         <input 
           type="tel" 
           placeholder="Contoh: 08123456789"
           value={phoneNumber}
           onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
           style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', border: '1px solid #EAEAEA', fontSize: '18px', backgroundColor: 'white', outline: 'none', fontWeight: '600', letterSpacing: '1px' }}
         />
      </div>

      <button 
        onClick={handleNumberSubmit}
        style={{ width: '100%', padding: '18px', borderRadius: '24px', backgroundColor: phoneNumber.length > 8 ? 'var(--primary)' : '#EAEAEA', color: phoneNumber.length > 8 ? 'white' : '#999', fontSize: '16px', fontWeight: '700', border: 'none', cursor: phoneNumber.length > 8 ? 'pointer' : 'not-allowed' }}
      >
        Lanjutkan
      </button>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
         <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: service.color, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: '700', fontSize: '16px' }}>
            {service.name[0]}
         </div>
         <div>
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#1F1F1F' }}>{service.name}</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#666', marginTop: '2px', letterSpacing: '1px' }}>{phoneNumber}</p>
         </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ color: '#1F1F1F', fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>Pilih Nominal Top Up</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
           {[20000, 50000, 100000, 200000, 300000, 500000].map(val => (
             <div 
               key={val} 
               onClick={() => setAmount(val.toString())} 
               style={{ 
                 padding: '20px', 
                 borderRadius: '16px', 
                 border: amount === val.toString() ? '2px solid var(--primary)' : '1px solid #EAEAEA', 
                 backgroundColor: amount === val.toString() ? '#F0EFFF' : 'white', 
                 cursor: 'pointer',
                 textAlign: 'center'
               }}>
               <span style={{ fontWeight: '700', fontSize: '16px', color: amount === val.toString() ? 'var(--primary)' : '#1F1F1F' }}>
                 {formatRupiah(val).replace('Rp', '')}
               </span>
             </div>
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

  const renderStep4 = () => (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)' }}>
       <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1F1F1F', textAlign: 'center', marginBottom: '12px' }}>Masukkan PIN</h2>
       <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginBottom: '40px' }}>Konfirmasi Top Up <b>{service.name}</b> sebesar <b>{formatRupiah(amount)}</b></p>
       
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
            Bayar {formatRupiah(amount)}
          </button>
       </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh)' }}>
       <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#00C853', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px' }}>
          <CheckCircle2 size={48} color="white" />
       </div>
       <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1F1F1F', marginBottom: '8px' }}>Top Up Berhasil!</h2>
       <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px' }}>Saldo {service.name} Anda telah bertambah.</p>
       
       <div style={{ width: '100%', backgroundColor: 'white', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
             <span style={{ color: '#666', fontSize: '14px' }}>Layanan</span>
             <span style={{ fontWeight: '700', color: '#1F1F1F', fontSize: '14px' }}>{service.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
             <span style={{ color: '#666', fontSize: '14px' }}>Nomor Tujuan</span>
             <span style={{ fontWeight: '700', color: '#1F1F1F', fontSize: '14px', letterSpacing: '1px' }}>{phoneNumber}</span>
          </div>
          <div style={{ width: '100%', height: '1px', backgroundColor: '#EAEAEA', margin: '24px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <span style={{ color: '#666', fontSize: '14px' }}>Total Bayar</span>
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

  return (
    <div style={{ backgroundColor: '#F8F9FE', minHeight: '100vh', paddingBottom: '40px' }}>
      {step < 5 && (
        <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, backgroundColor: '#F8F9FE', zIndex: 10 }}>
          <div onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <ArrowLeft color="#1F1F1F" size={20} />
          </div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1F1F1F' }}>
            {step === 1 ? 'Top Up & Tagihan' : step === 2 ? 'Nomor Tujuan' : step === 3 ? 'Pilih Nominal' : 'Konfirmasi PIN'}
          </h2>
        </div>
      )}
      
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
      {step === 5 && renderStep5()}
    </div>
  );
};

export default TopUpScreen;
