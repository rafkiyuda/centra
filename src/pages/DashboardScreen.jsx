import React, { useState } from 'react';
import { 
  Bell, Copy, EyeOff, Eye, Send, PlusCircle, Users, 
  ShoppingBag, Receipt, ShieldPlus, Menu, Home, User, 
  QrCode, MessageCircleQuestion, HeartPulse, Sparkles,
  ArrowUpRight, ArrowDownLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#FFFFFF', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      {/* Scrollable Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '120px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Avatar Area */}
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
             {/* Fallback CSS Avatar */}
             <div style={{ width: '20px', height: '20px', backgroundColor: '#FCD7B6', borderRadius: '50%', marginBottom: '20px' }}></div>
             <div style={{ width: '36px', height: '36px', backgroundColor: '#333', borderRadius: '18px 18px 0 0', position: 'absolute', bottom: '-10px' }}></div>
             
             {/* Actual Image (will cover the fallback if it exists) */}
             <img 
               src="/profile/avatar.jpg" 
               alt="Profile" 
               style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
               onError={(e) => {
                 e.target.style.display = 'none';
               }}
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
                { icon: <Send size={24} color="var(--primary)" />, label: 'Transfer' },
                { icon: <PlusCircle size={24} color="var(--primary)" />, label: 'Top-up' },
                { icon: <Users size={24} color="var(--primary)" />, label: 'Circle' },
                { icon: <ShoppingBag size={24} color="var(--primary)" />, label: 'Belanja' },
                { icon: <Receipt size={24} color="var(--primary)" />, label: 'Bayar' },
                { icon: <ShieldPlus size={24} color="var(--primary)" />, label: 'Care+' },
                { icon: <Receipt size={24} color="var(--primary)" />, label: 'Tagihan' },
                { icon: <Menu size={24} color="var(--primary)" />, label: 'Lainnya' }
              ].map((menu, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
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
              {/* Promo Card 1: Health */}
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

              {/* Promo Card 2: Shopping */}
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

          {/* Recent Transactions / Activity */}
          <div style={{ marginBottom: '20px' }}>
             <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>Transaksi Terakhir</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               
               {/* Transaction 1 */}
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

               {/* Transaction 2 */}
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#F8F9FE', borderRadius: '16px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E0F7FA', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     <Receipt size={20} color="#00ACC1" />
                   </div>
                   <div>
                     <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1F1F1F' }}>Bayar Listrik PLN</p>
                     <p style={{ margin: 0, fontSize: '12px', color: '#666', marginTop: '2px' }}>Kemarin, 14:20</p>
                   </div>
                 </div>
                 <span style={{ fontSize: '14px', fontWeight: '700', color: '#1F1F1F' }}>-Rp 450.000</span>
               </div>

             </div>
          </div>
        </div>
      </div>

      {/* Floating CITA Assistant - Fixed absolutely to the outer wrapper */}
      <div style={{
        position: 'absolute',
        bottom: '100px',
        right: '16px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '8px 12px',
          borderRadius: '16px',
          borderBottomRightRadius: '4px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '8px',
          border: '1px solid var(--primary-light)'
        }}>
          <p style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary)', margin: 0, textAlign: 'center', lineHeight: '1.2' }}>
            BUTUH BANTUAN<br/>DARI CITA?
          </p>
        </div>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--bg-gradient)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(107, 93, 194, 0.4)',
          cursor: 'pointer',
          border: '3px solid white'
        }}>
          <MessageCircleQuestion color="white" size={32} />
        </div>
      </div>

      {/* Bottom Navigation - Fixed absolutely to the outer wrapper */}
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
        
        {/* QRIS Center Button */}
        <div style={{ 
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
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#A0A0A0' }}>
          <User size={28} />
          <span style={{ fontSize: '12px', fontWeight: '600' }}>Profil</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
