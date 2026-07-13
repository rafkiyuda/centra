import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const AuthScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // After login, we proceed to assessment for demo purposes
      navigate('/assessment');
    }, 1500);
  };

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: '#F8F9FE', padding: 0 }}>
      {/* Top Header Background */}
      <div style={{
        background: 'var(--bg-gradient)',
        padding: '60px 24px 40px',
        borderBottomLeftRadius: '32px',
        borderBottomRightRadius: '32px',
        color: 'white',
        boxShadow: '0 10px 20px rgba(78, 64, 165, 0.15)'
      }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Selamat Datang!</h1>
        <p style={{ fontSize: '15px', opacity: 0.9, lineHeight: '1.5' }}>
          Masuk ke akun CENTRA Anda untuk mengelola keuangan dengan mudah dan aman.
        </p>
      </div>

      {/* Form Container */}
      <div style={{ padding: '32px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* User ID Input */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-gray)', marginBottom: '8px' }}>
              Username atau No. HP
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <User size={20} color="#9B8EF0" style={{ position: 'absolute', left: '16px' }} />
              <input 
                type="text" 
                placeholder="Masukkan username / No. HP"
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#FFFFFF',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-light)'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-gray)', marginBottom: '8px' }}>
              Kata Sandi
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={20} color="#9B8EF0" style={{ position: 'absolute', left: '16px' }} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Masukkan kata sandi Anda"
                style={{
                  width: '100%',
                  padding: '16px 48px 16px 48px',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#FFFFFF',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-light)'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                  position: 'absolute', 
                  right: '16px', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0
                }}
              >
                {showPassword ? <EyeOff size={20} color="#9B8EF0" /> : <Eye size={20} color="#9B8EF0" />}
              </button>
            </div>
            
            {/* Forgot Password */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button type="button" style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                Lupa Kata Sandi?
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
            style={{ 
              marginTop: '12px',
              padding: '16px',
              borderRadius: '16px',
              fontSize: '16px',
              boxShadow: '0 8px 20px rgba(107, 93, 194, 0.3)'
            }}
          >
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        {/* Register Link */}
        <div style={{ marginTop: 'auto', textAlign: 'center', paddingTop: '32px', paddingBottom: '16px' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-gray)' }}>
            Belum punya akun?{' '}
            <button type="button" style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
              Daftar Sekarang
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
