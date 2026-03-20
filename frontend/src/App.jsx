import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Home/Dashboard';
import AssetInventory from './pages/AssetInventory';
import AssetDiscovery from './components/AssetDiscovery/AssetDiscovery';
import CBOM from './components/CBOM/CBOM';
import PostureOfPQC from './components/PQC/PostureOfPQC';
import CyberRating from './pages/CyberRating';
import Reporting from './pages/Reporting';
import './index.css';

/* Placeholder for pages not yet implemented */
const Placeholder = ({ name }) => (
  <div className="animate-fade-in" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh', flexDirection:'column', gap:12 }}>
    <div style={{ fontSize:48, opacity:0.3 }}>🚧</div>
    <div style={{ fontFamily:'var(--font-display)', fontSize:20, color:'var(--text-muted)' }}>{name}</div>
    <div style={{ fontSize:13, color:'var(--text-muted)' }}>Coming soon</div>
  </div>
);

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <div className="app-shell">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
        <div className={`main-wrapper${collapsed ? ' sidebar-collapsed' : ''}`}>
          <Header collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
          <main className="content-area">
            <Routes>
              <Route path="/"                element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard"       element={<Dashboard />} />
              <Route path="/asset-inventory" element={<AssetInventory />} />
              <Route path="/asset-discovery" element={<AssetDiscovery />} />
              <Route path="/cbom"            element={<CBOM />} />
              <Route path="/posture-pqc"     element={<PostureOfPQC />} />
              <Route path="/cyber-rating"    element={<CyberRating />} />
              <Route path="/reporting"       element={<Reporting />} />
              <Route path="/remediation"     element={<Placeholder name="Remediation" />} />
              <Route path="/certificates"    element={<Placeholder name="Certificates" />} />
              <Route path="/compliance"      element={<Placeholder name="Compliance" />} />
              <Route path="*"               element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
