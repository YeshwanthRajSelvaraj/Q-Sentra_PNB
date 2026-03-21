import React, { useState } from 'react';
import { Shield, ExternalLink, Copy, CheckCircle, Search } from 'lucide-react';
import { MOCK_CERTS, getScoreClass } from '../mockData';
import { downloadPDF } from '../utils';

export default function Certificates() {
  const [certs, setCerts] = useState(MOCK_CERTS);
  const [showModal, setShowModal] = useState(false);
  const [newCert, setNewCert] = useState({
    assetId: '', quantumScore: 100, algorithms: 'Dilithium3, Kyber768'
  });

  // Verification state
  const [verifyingCert, setVerifyingCert] = useState(null);
  const [verifiedCert, setVerifiedCert] = useState(null);

  const handleIssue = () => {
    if (!newCert.assetId) {
      alert("Asset ID is required");
      return;
    }
    const cert = {
      certId: `CERT-00${certs.length + 1}`,
      assetId: newCert.assetId,
      quantumScore: parseInt(newCert.quantumScore),
      algorithms: newCert.algorithms.split(',').map(s => s.trim()),
      issuedAt: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 31536000000).toISOString().split('T')[0],
      status: 'Active',
      certificateHash: Math.random().toString(36).substring(2, 15) + '...8c92',
      blockchainTx: '0x' + Math.random().toString(16).substring(2, 10).toUpperCase() + '...',
      blockNumber: Math.floor(Math.random() * 1000000) + 1400000,
      network: 'Ethereum'
    };
    setCerts(prev => [cert, ...prev]);
    setShowModal(false);
    setNewCert({ assetId: '', quantumScore: 100, algorithms: 'Dilithium3, Kyber768' });
  };

  const handleVerify = (cert) => {
    setVerifyingCert(cert);
    setVerifiedCert(null);
    setTimeout(() => {
      setVerifyingCert(null);
      setVerifiedCert(cert);
    }, 2000);
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
        <div>
          <h1 className="page-title">Certificate Registry</h1>
          <p className="page-subtitle">Quantum-safe certificates with blockchain-anchored verification</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Shield size={14} /> Issue Certificate
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px' }}>
        {certs.map((cert, index) => {
          const isHigh = cert.quantumScore >= 80;
          const isMed = cert.quantumScore >= 50 && cert.quantumScore < 80;
          const accentColor = isHigh ? 'var(--success)' : isMed ? 'var(--warning)' : 'var(--danger)';
          
          return (
            <div className="card animate-slide-up" key={cert.certId} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderTop: `4px solid ${accentColor}`, animationDelay: `${index * 0.05}s` }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg-primary)', border: '1px solid var(--border-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)' }}>
                    <Shield size={22} color={accentColor} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, marginBottom: 4 }}>{cert.assetId}</h3>
                    <p className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{cert.certId}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                  <span className={`score-badge ${getScoreClass(cert.quantumScore)}`} style={{ padding: '4px 10px', fontSize: '12px', minWidth: '80px', justifyContent: 'center' }}>Score: {cert.quantumScore}</span>
                  <span style={{ fontSize: '10px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}><CheckCircle size={10} /> {cert.status}</span>
                </div>
              </div>

              <div style={{ padding: '20px 24px', flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: '1px dashed var(--border-faint)' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>PQC Algorithms</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{cert.algorithms.length > 2 ? `${cert.algorithms.slice(0, 2).join(', ')}...` : cert.algorithms.join(', ')}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: '1px dashed var(--border-faint)' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Validity</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{cert.issuedAt} <span style={{ color: 'var(--text-muted)', margin: '0 4px' }}>to</span> {cert.validUntil}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: '1px dashed var(--border-faint)' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ledger Network</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>{cert.network} <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)' }}/></span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: '1px dashed var(--border-faint)' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Block #</span>
                    <span className="mono" style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{cert.blockNumber}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tx Hash</span>
                    <span className="mono" style={{ fontSize: '11px', color: 'var(--cyan)', background: 'var(--cyan-dim)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border-mid)' }}>{cert.blockchainTx}</span>
                  </div>

                </div>
              </div>

              <div style={{ padding: '16px 24px', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-faint)', display: 'flex', gap: 12 }}>
                <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '12px', padding: '10px' }} onClick={() => handleVerify(cert)}>
                  <ExternalLink size={14} /> Verify on Chain
                </button>
                <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '12px', padding: '10px' }} onClick={() => downloadPDF(cert)}>
                  <Copy size={14} /> Export PDF
                </button>
              </div>
            </div>
          );
        })}

        {/* Placeholder for assets pending certification */}
        <div className="card" style={{ opacity: 0.5, borderStyle: 'dashed', borderColor: 'var(--border-strong)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: 300, flexDirection: 'column', gap: 16, color: 'var(--text-muted)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={32} strokeWidth={1.5} color="var(--text-muted)" />
            </div>
            <div style={{ textAlign: 'center', padding: '0 24px' }}>
              <div style={{ fontWeight: 600, marginBottom: 8, fontSize: '15px', color: 'var(--text-secondary)' }}>Pending Certifications</div>
              <div style={{ fontSize: '12px', lineHeight: 1.5 }}>8 discovered domains currently awaiting PQC mathematical migration to qualify for quantum-safe ledger certification.</div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div style={{ position:'fixed', inset:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.6)', backdropFilter:'blur(4px)' }}>
          <div className="card animate-fade-in" style={{ width:400, padding:24, display:'flex', flexDirection:'column', gap:16, border:'1px solid var(--border-mid)' }}>
            <h3 style={{ fontSize:18, fontWeight:600, color:'var(--text-primary)' }}>Issue Quantum-Safe Certificate</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <input 
                className="filter-select" 
                style={{ width:'100%', padding:'8px 12px' }} 
                placeholder="Asset ID (e.g. portal.pnb.co.in)" 
                value={newCert.assetId} 
                onChange={e=>setNewCert({...newCert, assetId: e.target.value})} 
              />
              <input 
                className="filter-select" 
                style={{ width:'100%', padding:'8px 12px' }} 
                placeholder="PQC Algorithms (comma separated)" 
                value={newCert.algorithms} 
                onChange={e=>setNewCert({...newCert, algorithms: e.target.value})} 
              />
              <input 
                className="filter-select" 
                type="number"
                style={{ width:'100%', padding:'8px 12px' }} 
                placeholder="Target Quantum Score" 
                value={newCert.quantumScore} 
                onChange={e=>setNewCert({...newCert, quantumScore: e.target.value})} 
              />
            </div>
            <div style={{ display:'flex', justifyContent:'flex-end', gap:12, marginTop:8 }}>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleIssue}>Issue Cert</button>
            </div>
          </div>
        </div>
      )}

      {/* Verify on Chain Modal */}
      {(verifyingCert || verifiedCert) && (
        <div style={{ position:'fixed', inset:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.7)', backdropFilter:'blur(4px)' }}>
          <div className="card animate-slide-up" style={{ width:500, padding:24, display:'flex', flexDirection:'column', gap:20, border:'1px solid var(--border-mid)' }}>
            
            {verifyingCert && (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16, padding:'40px 0' }}>
                <Search size={32} color="var(--cyan)" style={{ animation: 'pulse 1.5s infinite' }} />
                <h3 style={{ fontSize:18, color:'var(--text-primary)' }}>Querying Ledger...</h3>
                <p style={{ color:'var(--text-muted)', fontSize: 13, textAlign: 'center' }}>
                  Locating block {verifyingCert.blockNumber} on {verifyingCert.network}...<br/>
                  Validating cryptographic hash signature...
                </p>
              </div>
            )}

            {verifiedCert && (
              <>
                <div style={{ display:'flex', alignItems:'center', gap:12, borderBottom: '1px solid var(--border-mid)', paddingBottom: 16 }}>
                  <CheckCircle size={28} color="var(--success)" />
                  <div>
                    <h3 style={{ fontSize:18, fontWeight:600, color:'var(--text-primary)' }}>Verification Successful</h3>
                    <p style={{ color:'var(--text-muted)', fontSize: 13 }}>On-chain record matched local certificate</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--bg-mid)', padding: 16, borderRadius: 8 }}>
                  <div className="cert-detail-row"><span className="label">Asset</span><span className="value" style={{ fontWeight: 600 }}>{verifiedCert.assetId}</span></div>
                  <div className="cert-detail-row"><span className="label">Network</span><span className="value">{verifiedCert.network} Mainnet</span></div>
                  <div className="cert-detail-row"><span className="label">Block Confirmation</span><span className="value">{verifiedCert.blockNumber}</span></div>
                  <div className="cert-detail-row"><span className="label">Transaction ID</span><span className="value" style={{ color: 'var(--cyan)' }}>{verifiedCert.blockchainTx}</span></div>
                  <div className="cert-detail-row" style={{ marginTop: 8 }}><span className="label">Immutable Hash</span><span className="value mono" style={{ fontSize: '0.75rem', background: '#00000033', padding: '4px 8px', borderRadius: 4 }}>{verifiedCert.certificateHash}</span></div>
                  <div className="cert-detail-row"><span className="label">PQC Algorithms</span><span className="value">{verifiedCert.algorithms.join(', ')}</span></div>
                </div>

                <div style={{ display:'flex', justifyContent:'flex-end', marginTop:8 }}>
                  <button className="btn btn-outline" onClick={() => setVerifiedCert(null)}>Close Receipt</button>
                </div>
              </>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}
