import React, { useState, useEffect } from 'react';

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);
const ScanIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
  </svg>
);
const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

export default function Header({ collapsed, onToggle, onLogout }) {
  const [now, setNow] = useState(new Date());
  const [showScanModal, setShowScanModal] = useState(false);
  const [scanInput, setScanInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = d =>
    d.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) +
    '  ' +
    d.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false }) +
    ' IST';

  const handleQuickScan = () => {
    if (!scanInput) {
      alert("Please enter a domain or IP address to scan.");
      return;
    }
    setIsScanning(true);
    setScanResult(null);
    setShowScanModal(true);

    // mock scanning delay
    setTimeout(() => {
      setIsScanning(false);
      // mock results
      setScanResult({
        target: scanInput,
        status: 'Completed',
        pqcScore: Math.floor(Math.random() * 40) + 40,
        issuesFound: Math.floor(Math.random() * 5),
        certStatus: Math.random() > 0.5 ? 'Valid (RSA 2048)' : 'Weak (1024-bit key detected)'
      });
    }, 2000);
  };

  return (
    <>
      <header className={`header${collapsed ? ' sidebar-collapsed' : ''}`}>
        <button className="header-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          <MenuIcon />
        </button>

        <div className="live-indicator">
          <span className="live-dot" />
          Live Monitoring
        </div>

        <div className="header-search">
          <SearchIcon />
          <input 
            type="text" 
            placeholder="Scan a domain or IP address..." 
            value={scanInput}
            onChange={(e) => setScanInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleQuickScan()}
          />
        </div>

        <div className="header-right">
          <span className="header-datetime">{fmt(now)}</span>

          <div style={{ position: 'relative' }}>
            <button className="icon-btn" title="Notifications" onClick={() => setShowNotifs(!showNotifs)}>
              <BellIcon />
              {showNotifs ? null : <span className="notif-dot" />}
            </button>
            
            {showNotifs && (
              <div className="card animate-fade-in" style={{
                position: 'absolute', top: 48, right: 0, width: 320, zIndex: 9999,
                display: 'flex', flexDirection: 'column', gap: 0,
                border: '1px solid var(--border-mid)', padding: 0, overflow: 'hidden'
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-card-hover)' }}>
                  <h4 style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)' }}>System Alerts</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 300, overflowY: 'auto' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)', cursor: 'pointer' }} className="hover-highlight">
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--danger)', marginBottom: 4 }}>High Risk: TLS Downgrade Detected</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Server 10.14.22.5 is attempting to negotiate TLS 1.1 handshakes.</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 6 }}>2 mins ago</div>
                  </div>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)', cursor: 'pointer' }} className="hover-highlight">
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--warning)', marginBottom: 4 }}>Certificate Expiring Soon</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Payment Gateway Root CA expires in 14 days. Renewal required.</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 6 }}>1 hr ago</div>
                  </div>
                  <div style={{ padding: '12px 16px', cursor: 'pointer' }} className="hover-highlight">
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--cyan)', marginBottom: 4 }}>System Update: Engine v2.4</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>FIPS-203 algorithm detection module updated successfully.</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 6 }}>5 hrs ago</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="btn btn-primary btn-sm" style={{ gap:6 }} onClick={handleQuickScan}>
            <ScanIcon />
            Quick Scan
          </button>

          <div className="user-chip" onClick={onLogout} style={{ cursor: 'pointer' }} title="Logout">
            <div style={{
              width:22, height:22, borderRadius:5,
              background:'linear-gradient(135deg,var(--cyan),var(--purple))',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:10, fontWeight:700, color:'white', flexShrink:0,
            }}>SA</div>
            <span style={{ color:'var(--text-secondary)', fontSize:12 }}>hackathon_user</span>
            <LogoutIcon />
          </div>
        </div>
      </header>

      {showScanModal && (
        <div style={{ position:'fixed', inset:0, zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.6)', backdropFilter:'blur(4px)' }}>
          <div className="card animate-fade-in" style={{ width:400, padding:24, display:'flex', flexDirection:'column', gap:16, border:'1px solid var(--border-mid)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <ScanIcon />
              <h3 style={{ fontSize:18, fontWeight:600, color:'var(--text-primary)' }}>Quick Scan</h3>
            </div>
            
            {isScanning ? (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, padding:'24px 0' }}>
                <div style={{ width: 30, height: 30, border: '3px solid var(--border-subtle)', borderTopColor: 'var(--cyan)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <div style={{ color:'var(--text-muted)' }}>Analyzing {scanInput}...</div>
              </div>
            ) : (
              scanResult && (
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  <div className="cert-detail-row"><span className="label">Target</span><span className="value">{scanResult.target}</span></div>
                  <div className="cert-detail-row"><span className="label">Status</span><span className="value" style={{ color: 'var(--success)' }}>● {scanResult.status}</span></div>
                  <div className="cert-detail-row"><span className="label">Quantum Score</span><span className="value score-badge safe">{scanResult.pqcScore}/100</span></div>
                  <div className="cert-detail-row"><span className="label">Certificate</span><span className="value" style={{ color: scanResult.certStatus.includes('Weak') ? 'var(--danger)' : 'var(--text-primary)' }}>{scanResult.certStatus}</span></div>
                  <div className="cert-detail-row"><span className="label">Issues Found</span><span className="value">{scanResult.issuesFound}</span></div>
                </div>
              )
            )}

            <div style={{ display:'flex', justifyContent:'flex-end', gap:12, marginTop:8 }}>
              <button className="btn btn-outline" onClick={() => setShowScanModal(false)} disabled={isScanning}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
