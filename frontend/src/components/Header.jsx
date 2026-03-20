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

export default function Header({ collapsed, onToggle }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = d =>
    d.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) +
    '  ' +
    d.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false }) +
    ' IST';

  return (
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
        <input type="text" placeholder="Scan a domain or IP address..." />
      </div>

      <div className="header-right">
        <span className="header-datetime">{fmt(now)}</span>

        <button className="icon-btn" title="Notifications">
          <BellIcon />
          <span className="notif-dot" />
        </button>

        <button className="btn btn-primary btn-sm" style={{ gap:6 }}>
          <ScanIcon />
          Quick Scan
        </button>

        <div className="user-chip">
          <div style={{
            width:22, height:22, borderRadius:5,
            background:'linear-gradient(135deg,var(--cyan),var(--purple))',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:10, fontWeight:700, color:'white', flexShrink:0,
          }}>SA</div>
          <span style={{ color:'var(--text-secondary)', fontSize:12 }}>hackathon_user</span>
          <ChevronIcon />
        </div>
      </div>
    </header>
  );
}
