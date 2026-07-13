import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Zap, Droplets, Wifi, CreditCard, CheckCircle2, Loader2 } from 'lucide-react';

const BayarScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Category, 2: Input ID, 3: Loading, 4: Bill Details, 5: Success
  
  const [category, setCategory] = useState(null);
  const [customerId, setCustomerId] = useState('');
  
  // Dummy bill data
  const billData = {
    amount: 354000,
    name: 'Ellyanna Filia',
    period: 'Juli 2026',
    adminFee: 2500
  };

  const categories = [
    { id: 'pln', name: 'Listrik PLN', icon: Zap, color: '#FFB800' },
    { id: 'pdam', name: 'Air PDAM', icon: Droplets, color: '#00AED6' },
    { id: 'internet', name: 'Internet & TV', icon: Wifi, color: '#6B5DC2' },
    { id: 'cc', name: 'Kartu Kredit', icon: CreditCard, color: '#FF4A4A' }
  ];

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
  };

  const handleSelectCategory = (cat) => {
    setCategory(cat);
    setStep(2);
  };

  const handleCheckBill = () => {
    if (customerId.length > 5) {
      setStep(3); // Loading step
      setTimeout(() => {
        setStep(4); // Details step
      }, 2000);
    }
  };

  const handlePay = () => {
    // Simulate PIN entry conceptually skipped for brevity here, jump to success
    setStep(5);
  };

  const renderStep1 = () => (
    <div className="animate-fade-in" style={{ padding: '24px' }}>
      <div style={{ position: 'relative', marginBottom: '32px' }}>
        <input 
          type="text" 
          placeholder="Cari layanan tagihan" 
          style={{ width: '100%', padding: '16px 16px 16px 50px', borderRadius: '16px', border: '1px solid #EAEAEA', fontSize: '15px', backgroundColor: 'white', outline: 'none' }}
        />
        <Search color="#999" size={20} style={{ position: 'absolute', left: '16px', top: '18px' }} />
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#1F1F1F' }}>Kategori Tagihan</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '12px' }}>
        {categories.map((cat) => (
          <div key={cat.id} onClick={() => handleSelectCategory(cat)} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
             <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: `${cat.color}20`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <cat.icon color={cat.color} size={24} />
             </div>
             <span style={{ fontWeight: '700', fontSize: '16px', color: '#1F1F1F' }}>{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
         <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: `${category.color}20`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <category.icon color={category.color} size={28} />
         </div>
         <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1F1F1F' }}>{category.name}</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Masukkan nomor pelanggan / ID</p>
         </div>
      </div>

      <div style={{ flex: 1 }}>
         <p style={{ color: '#1F1F1F', fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Nomor Pelanggan</p>
         <input 
           type="number" 
           placeholder="Contoh: 1234567890"
           value={customerId}
           onChange={(e) => setCustomerId(e.target.value)}
           style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', border: '1px solid #EAEAEA', fontSize: '18px', backgroundColor: 'white', outline: 'none', fontWeight: '600', letterSpacing: '1px' }}
         />
      </div>

      <button 
        onClick={handleCheckBill}
        style={{ width: '100%', padding: '18px', borderRadius: '24px', backgroundColor: customerId.length > 5 ? 'var(--primary)' : '#EAEAEA', color: customerId.length > 5 ? 'white' : '#999', fontSize: '16px', fontWeight: '700', border: 'none', cursor: customerId.length > 5 ? 'pointer' : 'not-allowed' }}
      >
        Cek Tagihan
      </button>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)' }}>
       <Loader2 size={48} color="var(--primary)" className="animate-spin" style={{ marginBottom: '24px', animation: 'spin 1s linear infinite' }} />
       <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '700', color: '#1F1F1F' }}>Mengecek Tagihan...</h2>
       <p style={{ margin: 0, fontSize: '14px', color: '#666', textAlign: 'center' }}>Menghubungkan ke server {category.name}</p>
       <style>{`
         @keyframes spin { 100% { transform: rotate(360deg); } }
       `}</style>
    </div>
  );

  const renderStep4 = () => (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px', color: '#1F1F1F' }}>Detail Tagihan</h3>
      
      <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: '#666', fontSize: '14px' }}>Layanan</span>
            <span style={{ fontWeight: '700', color: '#1F1F1F', fontSize: '14px' }}>{category.name}</span>
         </div>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: '#666', fontSize: '14px' }}>ID Pelanggan</span>
            <span style={{ fontWeight: '700', color: '#1F1F1F', fontSize: '14px' }}>{customerId}</span>
         </div>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: '#666', fontSize: '14px' }}>Nama Pelanggan</span>
            <span style={{ fontWeight: '700', color: '#1F1F1F', fontSize: '14px' }}>{billData.name}</span>
         </div>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: '#666', fontSize: '14px' }}>Periode Tagihan</span>
            <span style={{ fontWeight: '700', color: '#1F1F1F', fontSize: '14px' }}>{billData.period}</span>
         </div>
         
         <div style={{ width: '100%', height: '1px', backgroundColor: '#EAEAEA', margin: '24px 0' }} />
         
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: '#666', fontSize: '14px' }}>Nominal Tagihan</span>
            <span style={{ fontWeight: '700', color: '#1F1F1F', fontSize: '14px' }}>{formatRupiah(billData.amount)}</span>
         </div>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: '#666', fontSize: '14px' }}>Biaya Admin</span>
            <span style={{ fontWeight: '700', color: '#1F1F1F', fontSize: '14px' }}>{formatRupiah(billData.adminFee)}</span>
         </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ color: '#1F1F1F', fontSize: '16px', fontWeight: '700' }}>Total Pembayaran</span>
            <span style={{ color: 'var(--primary)', fontSize: '24px', fontWeight: '800' }}>{formatRupiah(billData.amount + billData.adminFee)}</span>
         </div>

         <button 
           onClick={handlePay}
           style={{ width: '100%', padding: '18px', borderRadius: '24px', backgroundColor: 'var(--primary)', color: 'white', fontSize: '16px', fontWeight: '700', border: 'none', cursor: 'pointer', boxShadow: '0 8px 16px rgba(107, 93, 194, 0.3)' }}
         >
           Bayar Sekarang
         </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh)' }}>
       <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#00C853', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px' }}>
          <CheckCircle2 size={48} color="white" />
       </div>
       <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1F1F1F', marginBottom: '8px' }}>Pembayaran Berhasil!</h2>
       <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px', textAlign: 'center' }}>Tagihan {category.name} Anda sudah lunas.</p>
       
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
      {step < 3 && (
        <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, backgroundColor: '#F8F9FE', zIndex: 10 }}>
          <div onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <ArrowLeft color="#1F1F1F" size={20} />
          </div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1F1F1F' }}>
            {step === 1 ? 'Bayar Tagihan' : category?.name}
          </h2>
        </div>
      )}

      {step === 4 && (
        <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, backgroundColor: '#F8F9FE', zIndex: 10 }}>
          <div onClick={() => setStep(2)} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <ArrowLeft color="#1F1F1F" size={20} />
          </div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1F1F1F' }}>
            Konfirmasi
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

export default BayarScreen;
