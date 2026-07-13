import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart, Star, Heart, CheckCircle2, ChevronRight, Package, Truck, Wallet } from 'lucide-react';

const BelanjaScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Home, 2: Checkout, 3: Success
  const [cart, setCart] = useState([]);
  
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
  };

  const categories = ['Semua', 'Elektronik', 'Pakaian', 'Makanan', 'Kesehatan'];
  const [activeCategory, setActiveCategory] = useState('Semua');

  const products = [
    { id: 1, name: 'Apple AirPods Pro (2nd Gen)', price: 3500000, rating: 4.9, sold: '2.1k', image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&q=80', category: 'Elektronik' },
    { id: 2, name: 'Nike Air Force 1 \'07', price: 1549000, rating: 4.8, sold: '5.4k', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80', category: 'Pakaian' },
    { id: 3, name: 'Kopi Arabica Gayo 200g', price: 85000, rating: 4.7, sold: '1.2k', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&q=80', category: 'Makanan' },
    { id: 4, name: 'ErgoChair Pro Office', price: 4200000, rating: 4.6, sold: '850', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400&q=80', category: 'Peralatan' }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const renderStep1 = () => (
    <div className="animate-fade-in" style={{ paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div onClick={() => navigate(-1)} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F0EFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <ArrowLeft color="var(--primary)" size={20} />
          </div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1F1F1F' }}>CENTRA Mall</h2>
        </div>
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => cart.length > 0 && setStep(2)}>
          <ShoppingCart color="#1F1F1F" size={24} />
          {cart.length > 0 && (
            <div style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#FF4A4A', color: 'white', fontSize: '10px', fontWeight: '800', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {cart.length}
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <input 
            type="text" 
            placeholder="Cari barang impianmu..." 
            style={{ width: '100%', padding: '16px 16px 16px 50px', borderRadius: '16px', border: '1px solid #EAEAEA', fontSize: '14px', backgroundColor: 'white', outline: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}
          />
          <Search color="#999" size={20} style={{ position: 'absolute', left: '16px', top: '16px' }} />
        </div>

        {/* Banner Promo */}
        <div style={{ width: '100%', height: '160px', borderRadius: '24px', background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)', position: 'relative', overflow: 'hidden', marginBottom: '24px', padding: '24px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
           <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800', maxWidth: '60%' }}>Payday Sale!</h2>
           <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.9, maxWidth: '60%' }}>Diskon hingga 70% pakai CENTRA Pay</p>
           <button style={{ padding: '8px 16px', backgroundColor: 'white', color: '#FF6B6B', border: 'none', borderRadius: '20px', fontWeight: '700', fontSize: '12px', width: 'fit-content', marginTop: '16px', cursor: 'pointer' }}>Belanja Sekarang</button>
           
           <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', width: '150px', height: '150px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
           <div style={{ position: 'absolute', right: '40px', top: '-20px', width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', margin: '0 -24px 16px', paddingLeft: '24px' }} className="hide-scrollbar">
          {categories.map(cat => (
            <div 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              style={{ padding: '10px 20px', borderRadius: '20px', backgroundColor: activeCategory === cat ? 'var(--primary)' : 'white', color: activeCategory === cat ? 'white' : '#666', border: activeCategory === cat ? 'none' : '1px solid #EAEAEA', fontWeight: '600', fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#1F1F1F' }}>Rekomendasi Untukmu</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {products.filter(p => activeCategory === 'Semua' || p.category === activeCategory).map(product => (
            <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
               <div style={{ width: '100%', height: '150px', position: 'relative' }}>
                 <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 <div style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                   <Heart size={16} color="#CCC" />
                 </div>
               </div>
               <div style={{ padding: '16px' }}>
                 <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#1F1F1F', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '36px' }}>{product.name}</p>
                 <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '800', color: 'var(--primary)' }}>{formatRupiah(product.price)}</h4>
                 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                   <Star size={12} color="#FFB800" fill="#FFB800" />
                   <span style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>{product.rating}</span>
                   <span style={{ fontSize: '12px', color: '#999' }}>| Terjual {product.sold}</span>
                 </div>
                 
                 <button 
                   onClick={() => addToCart(product)}
                   style={{ width: '100%', padding: '10px', borderRadius: '12px', backgroundColor: '#F0EFFF', color: 'var(--primary)', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
                 >
                   + Keranjang
                 </button>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button if has items */}
      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: '24px', left: '24px', right: '24px', backgroundColor: 'var(--primary)', borderRadius: '24px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', boxShadow: '0 12px 24px rgba(107, 93, 194, 0.4)', zIndex: 100, cursor: 'pointer' }} onClick={() => setStep(2)}>
           <div>
             <p style={{ margin: '0 0 4px 0', fontSize: '12px', opacity: 0.9 }}>Total ({cart.length} barang)</p>
             <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>{formatRupiah(getTotal())}</h4>
           </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '14px' }}>
             Checkout <ChevronRight size={18} />
           </div>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-fade-in" style={{ backgroundColor: '#F8F9FE', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
       {/* Header */}
       <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'white', borderBottom: '1px solid #EAEAEA' }}>
        <div onClick={() => setStep(1)} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F0EFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <ArrowLeft color="var(--primary)" size={20} />
        </div>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1F1F1F' }}>Checkout</h2>
      </div>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        {/* Alamat */}
        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', marginBottom: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
             <Package size={18} color="var(--primary)" />
             <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#1F1F1F' }}>Alamat Pengiriman</h3>
          </div>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#1F1F1F' }}>Kantor CENTRA Tower</p>
          <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: 1.5 }}>Jl. Jend. Sudirman No. Kav 21, RT.10/RW.1, Kuningan, Karet, Kecamatan Setiabudi, Kota Jakarta Selatan, 12920</p>
        </div>

        {/* Items */}
        <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: '#1F1F1F' }}>Pesanan Anda ({cart.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {cart.map((item, idx) => (
            <div key={idx} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', display: 'flex', gap: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#1F1F1F', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: 'var(--primary)' }}>{formatRupiah(item.price)}</h4>
                  <span style={{ fontSize: '13px', color: '#999' }}>1x</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pengiriman */}
        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', marginBottom: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
             <Truck size={18} color="var(--primary)" />
             <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#1F1F1F' }}>Pilih Pengiriman</h3>
          </div>
          <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--primary)', backgroundColor: '#F0EFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div>
                <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#1F1F1F' }}>Instan (2 Jam Sampai)</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Kurir GoSend / GrabExpress</p>
             </div>
             <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)' }}>Rp 25.000</span>
          </div>
        </div>

        {/* Pembayaran */}
        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
             <Wallet size={18} color="var(--primary)" />
             <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#1F1F1F' }}>Metode Pembayaran</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-gradient)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: '800', fontSize: '12px' }}>
              C
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#1F1F1F' }}>Saldo CENTRA</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Sisa saldo: Rp 1.000.000</p>
            </div>
            <CheckCircle2 size={24} color="var(--primary)" />
          </div>
        </div>
      </div>

      {/* Bottom Bar Checkout */}
      <div style={{ padding: '24px', backgroundColor: 'white', borderTop: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div>
            <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#666' }}>Total Pembayaran</p>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: 'var(--primary)' }}>{formatRupiah(getTotal() + 25000)}</h2>
         </div>
         <button 
           onClick={() => {
              // Simulate payment process
              setTimeout(() => setStep(3), 800);
           }}
           style={{ padding: '16px 32px', borderRadius: '24px', backgroundColor: 'var(--primary)', color: 'white', border: 'none', fontWeight: '700', fontSize: '15px', cursor: 'pointer', boxShadow: '0 8px 16px rgba(107, 93, 194, 0.3)' }}>
           Bayar
         </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh)' }}>
       <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#00C853', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px' }}>
          <CheckCircle2 size={48} color="white" />
       </div>
       <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1F1F1F', marginBottom: '8px' }}>Pesanan Berhasil!</h2>
       <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px', textAlign: 'center' }}>Pembayaran telah diterima dan pesanan segera diproses.</p>
       
       <div style={{ width: '100%', backgroundColor: 'white', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
             <span style={{ color: '#666', fontSize: '14px' }}>No. Pesanan</span>
             <span style={{ fontWeight: '700', color: '#1F1F1F', fontSize: '14px' }}>ORD-{Math.floor(Math.random() * 1000000)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
             <span style={{ color: '#666', fontSize: '14px' }}>Kurir</span>
             <span style={{ fontWeight: '700', color: '#1F1F1F', fontSize: '14px' }}>Instan (2 Jam)</span>
          </div>
          <div style={{ width: '100%', height: '1px', backgroundColor: '#EAEAEA', margin: '24px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <span style={{ color: '#666', fontSize: '14px' }}>Total Dibayar</span>
             <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '24px' }}>{formatRupiah(getTotal() + 25000)}</span>
          </div>
       </div>

       <button 
          onClick={() => {
            setCart([]);
            navigate('/dashboard');
          }}
          style={{ width: '100%', padding: '18px', borderRadius: '24px', backgroundColor: 'var(--primary)', color: 'white', fontSize: '16px', fontWeight: '700', border: 'none', cursor: 'pointer' }}
        >
          Kembali ke Beranda
        </button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#F8F9FE', minHeight: '100vh' }}>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
};

export default BelanjaScreen;
