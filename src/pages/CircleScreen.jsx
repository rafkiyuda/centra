import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Users, PlusCircle, ArrowUpRight, ArrowDownLeft, Target, Receipt, Share2, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import TutorialGuide from '../components/TutorialGuide';

const CircleScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTutorial = new URLSearchParams(location.search).get('tutorial') === 'true';
  const [showTutorial, setShowTutorial] = useState(isTutorial);
  const [activeTab, setActiveTab] = useState('pockets'); // pockets, split
  const [selectedPocket, setSelectedPocket] = useState(null);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
  };

  const sharedPockets = [
    {
      id: 1,
      name: 'Liburan Bali 2026',
      target: 15000000,
      collected: 8500000,
      members: ['A', 'B', 'C', 'D'],
      color: '#6B5DC2',
      transactions: [
        { name: 'Budi setor', amount: 500000, date: 'Hari ini', type: 'in' },
        { name: 'Tiket Pesawat', amount: 3200000, date: 'Kemarin', type: 'out' }
      ]
    },
    {
      id: 2,
      name: 'Patungan WiFi Kos',
      target: 350000,
      collected: 350000,
      members: ['A', 'R', 'S'],
      color: '#00C853',
      transactions: [
        { name: 'Bayar Indihome', amount: 350000, date: '12 Jul', type: 'out' }
      ]
    }
  ];

  const splitBills = [
    { id: 1, title: 'Makan Malam Sushi Tei', total: 450000, participants: 3, myShare: 150000, status: 'unpaid', by: 'Sasa' },
    { id: 2, title: 'Kado Nikahan Reza', total: 1000000, participants: 5, myShare: 200000, status: 'paid', by: 'Budi' }
  ];

  const renderPocketDetails = () => (
    <div className="animate-fade-in" style={{ minHeight: '100vh', backgroundColor: '#F8F9FE' }}>
      <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: selectedPocket.color, color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div onClick={() => setSelectedPocket(null)} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
            <ArrowLeft color="white" size={20} />
          </div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{selectedPocket.name}</h2>
        </div>
        <MoreHorizontal color="white" />
      </div>

      <div style={{ backgroundColor: selectedPocket.color, padding: '0 24px 40px', color: 'white', borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px' }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', opacity: 0.9 }}>Terkumpul</p>
        <h1 style={{ margin: '0 0 24px 0', fontSize: '36px', fontWeight: '800', letterSpacing: '-1px' }}>{formatRupiah(selectedPocket.collected)}</h1>
        
        <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '16px', padding: '16px', backdropFilter: 'blur(10px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}><Target size={14} /> Target</span>
            <span style={{ fontSize: '13px', fontWeight: '700' }}>{formatRupiah(selectedPocket.target)}</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${(selectedPocket.collected / selectedPocket.target) * 100}%`, height: '100%', backgroundColor: 'white', borderRadius: '4px' }} />
          </div>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', textAlign: 'right' }}>{Math.round((selectedPocket.collected / selectedPocket.target) * 100)}% tercapai</p>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Members */}
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#1F1F1F' }}>Anggota Grup ({selectedPocket.members.length})</h3>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          {selectedPocket.members.map((m, i) => (
            <div key={i} style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#EAEAEA', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '700', color: '#666', border: '2px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              {m}
            </div>
          ))}
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', border: `2px dashed ${selectedPocket.color}`, color: selectedPocket.color, cursor: 'pointer' }}>
            <PlusCircle size={20} />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <button style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--primary)', color: 'white', border: 'none', fontWeight: '700', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(107, 93, 194, 0.3)' }}>
            <PlusCircle size={18} /> Setor Dana
          </button>
          <button style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'white', color: 'var(--primary)', border: '1px solid var(--primary)', fontWeight: '700', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <ArrowUpRight size={18} /> Tarik Dana
          </button>
        </div>

        {/* Transactions */}
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#1F1F1F' }}>Riwayat Grup</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {selectedPocket.transactions.map((tx, i) => (
            <div key={i} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: tx.type === 'in' ? '#E8F5E9' : '#FFEBEE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {tx.type === 'in' ? <ArrowDownLeft color="#4CAF50" size={20} /> : <ArrowUpRight color="#FF4A4A" size={20} />}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#1F1F1F' }}>{tx.name}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{tx.date}</p>
                </div>
              </div>
              <span style={{ fontWeight: '700', fontSize: '14px', color: tx.type === 'in' ? '#4CAF50' : '#FF4A4A' }}>
                {tx.type === 'in' ? '+' : '-'}{formatRupiah(tx.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (selectedPocket) return renderPocketDetails();

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#F8F9FE', minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Header */}
      <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'white' }}>
        <div onClick={() => navigate(-1)} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F0EFFF', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <ArrowLeft color="var(--primary)" size={20} />
        </div>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1F1F1F' }}>Circle CENTRA</h2>
      </div>

      {/* Tabs */}
      <div id="tutorial-tabs" style={{ display: 'flex', padding: '0 24px', backgroundColor: 'white', borderBottom: '1px solid #EAEAEA' }}>
        <div 
          onClick={() => setActiveTab('pockets')}
          style={{ flex: 1, padding: '16px 0', textAlign: 'center', fontWeight: '700', fontSize: '14px', color: activeTab === 'pockets' ? 'var(--primary)' : '#999', borderBottom: activeTab === 'pockets' ? '2px solid var(--primary)' : '2px solid transparent', cursor: 'pointer' }}
        >
          Shared Pockets
        </div>
        <div 
          onClick={() => setActiveTab('split')}
          style={{ flex: 1, padding: '16px 0', textAlign: 'center', fontWeight: '700', fontSize: '14px', color: activeTab === 'split' ? 'var(--primary)' : '#999', borderBottom: activeTab === 'split' ? '2px solid var(--primary)' : '2px solid transparent', cursor: 'pointer' }}
        >
          Split Bill
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {activeTab === 'pockets' && (
          <div id="tutorial-pockets" className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1F1F1F', margin: 0 }}>Grup Tabungan Aktif</h3>
              <button style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: '#F0EFFF', color: 'var(--primary)', border: 'none', fontWeight: '700', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <PlusCircle size={14} /> Buat Baru
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {sharedPockets.map(pocket => (
                <div key={pocket.id} onClick={() => setSelectedPocket(pocket)} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '20px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', backgroundColor: pocket.color, opacity: 0.1, borderRadius: '50%', transform: 'translate(30%, -30%)' }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: '#1F1F1F' }}>{pocket.name}</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{pocket.members.length} Anggota</p>
                    </div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: `${pocket.color}20`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Users color={pocket.color} size={20} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: pocket.color }}>{formatRupiah(pocket.collected)}</h2>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#EAEAEA', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: `${(pocket.collected / pocket.target) * 100}%`, height: '100%', backgroundColor: pocket.color, borderRadius: '3px' }} />
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Target: {formatRupiah(pocket.target)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'split' && (
          <div className="animate-fade-in">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1F1F1F', margin: 0 }}>Tagihan Split Bill</h3>
              <button style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: '#F0EFFF', color: 'var(--primary)', border: 'none', fontWeight: '700', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <Receipt size={14} /> Tagih Teman
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {splitBills.map(bill => (
                <div key={bill.id} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: bill.status === 'paid' ? '#E8F5E9' : '#FFF0F0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {bill.status === 'paid' ? <CheckCircle2 color="#4CAF50" /> : <Share2 color="#FF4A4A" />}
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: '#1F1F1F' }}>{bill.title}</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Oleh {bill.by} • {bill.participants} Orang</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '16px', backgroundColor: '#F8F9FE', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#666' }}>Bagian Anda</p>
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#1F1F1F' }}>{formatRupiah(bill.myShare)}</h3>
                    </div>
                    {bill.status === 'unpaid' ? (
                      <button style={{ padding: '10px 24px', borderRadius: '20px', backgroundColor: 'var(--primary)', color: 'white', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                        Bayar
                      </button>
                    ) : (
                      <div style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: '#E8F5E9', color: '#4CAF50', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={16} /> Lunas
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showTutorial && activeTab === 'pockets' && !selectedPocket && (
         <TutorialGuide 
           steps={[
             { targetId: 'tutorial-tabs', title: 'Pilih Mode', content: 'Gunakan tab ini untuk berpindah antara fitur tabungan bersama (Shared Pockets) dan patungan tagihan (Split Bill).' },
             { targetId: 'tutorial-pockets', title: 'Grup Tabungan', content: 'Daftar semua tabungan bersama Anda. Pantau progress, tambah anggota, dan capai target bersama!' }
           ]} 
           onComplete={() => setShowTutorial(false)} 
         />
      )}
    </div>
  );
};

export default CircleScreen;
