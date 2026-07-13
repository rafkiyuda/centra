import React from 'react';
import { 
  Home, User, QrCode, ChevronRight, Settings, 
  ShieldCheck, HelpCircle, LogOut, FileText, 
  Users, Smartphone, Fingerprint 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#F8F9FE', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      {/* Scrollable Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '120px' }}>
        
        {/* Header Background */}
        <div style={{
          background: 'var(--bg-gradient)',
          padding: '40px 24px 80px',
          borderBottomLeftRadius: '32px',
          borderBottomRightRadius: '32px',
          color: 'white',
          textAlign: 'center',
          position: 'relative'
        }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Profil Saya</h2>
        </div>

        {/* Profile Card Overlay */}
        <div style={{
          margin: '-60px 24px 24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 8px 24px rgba(107, 93, 194, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Avatar */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#8BC6EC',
            backgroundImage: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            marginTop: '-40px', // Pull it up to overlay the edge
            border: '4px solid #FFFFFF',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
             <div style={{ width: '30px', height: '30px', backgroundColor: '#FCD7B6', borderRadius: '50%', marginBottom: '30px' }}></div>
             <div style={{ width: '56px', height: '56px', backgroundColor: '#333', borderRadius: '28px 28px 0 0', position: 'absolute', bottom: '-16px' }}></div>
             
             <img 
               src="/profile/avatar.jpg" 
               alt="Profile" 
               style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
               onError={(e) => { e.target.style.display = 'none'; }}
             />
          </div>
          
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1F1F1F', margin: '16px 0 4px' }}>Ellyanna Filia</h2>
          <p style={{ fontSize: '14px', color: '#666', margin: 0, fontWeight: '500' }}>0812-3456-7890</p>
          
          {/* Membership Badge */}
          <div style={{
            marginTop: '16px',
            backgroundColor: '#FFF0F5',
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid #FFD6E5',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#FF6B9E', borderRadius: '50%' }}></div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#D9385E' }}>Anggota Prioritas</span>
          </div>
        </div>

        {/* Menu Sections */}
        <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Section 1: Keamanan & Pengaturan */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#666', margin: '0 0 12px 12px' }}>Keamanan & Pengaturan</h3>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '8px 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #F0F0F0', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F0EFFF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Fingerprint size={20} color="var(--primary)" />
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#1F1F1F' }}>Pengaturan Biometrik</span>
                </div>
                <ChevronRight size={20} color="#A0A0A0" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #F0F0F0', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F0EFFF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ShieldCheck size={20} color="var(--primary)" />
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#1F1F1F' }}>Ubah PIN & Password</span>
                </div>
                <ChevronRight size={20} color="#A0A0A0" />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F0EFFF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Settings size={20} color="var(--primary)" />
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#1F1F1F' }}>Pengaturan Tampilan</span>
                </div>
                <ChevronRight size={20} color="#A0A0A0" />
              </div>

            </div>
          </div>

          {/* Section 2: Fitur Khusus */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#666', margin: '0 0 12px 12px' }}>Fitur Khusus CENTRA</h3>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '8px 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #F0F0F0', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFF4E5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Users size={20} color="#F2994A" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '15px', fontWeight: '600', color: '#1F1F1F' }}>Kelola CENTRA Circle</span>
                    <span style={{ fontSize: '12px', color: '#666' }}>Anggota: Budi (Anak)</span>
                  </div>
                </div>
                <ChevronRight size={20} color="#A0A0A0" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E5F9F6', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Smartphone size={20} color="#00BFA5" />
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#1F1F1F' }}>Perangkat Tertaut</span>
                </div>
                <ChevronRight size={20} color="#A0A0A0" />
              </div>

            </div>
          </div>

          {/* Section 3: Bantuan */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#666', margin: '0 0 12px 12px' }}>Bantuan & Info</h3>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '8px 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #F0F0F0', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F9F9F9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <HelpCircle size={20} color="#666" />
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#1F1F1F' }}>Pusat Bantuan</span>
                </div>
                <ChevronRight size={20} color="#A0A0A0" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F9F9F9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FileText size={20} color="#666" />
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#1F1F1F' }}>Syarat & Ketentuan</span>
                </div>
                <ChevronRight size={20} color="#A0A0A0" />
              </div>

            </div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              backgroundColor: '#FFF0F0',
              color: '#FF4A4A',
              border: 'none',
              borderRadius: '24px',
              padding: '16px',
              fontSize: '15px',
              fontWeight: '700',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              marginTop: '8px'
            }}
          >
            <LogOut size={20} />
            Keluar dari Aplikasi
          </button>

          {/* App Version */}
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#A0A0A0', marginTop: '16px' }}>
            CENTRA App v1.0.0
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
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
        <div 
          onClick={() => navigate('/dashboard')}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#A0A0A0' }}
        >
          <Home size={28} />
          <span style={{ fontSize: '12px', fontWeight: '600' }}>Beranda</span>
        </div>
        
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
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: 'var(--primary)' }}>
          <User size={28} />
          <span style={{ fontSize: '12px', fontWeight: '700' }}>Profil</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
