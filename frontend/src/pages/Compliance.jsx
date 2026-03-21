import React, { useState } from 'react';
import { FlaskConical, Building2, CreditCard, ClipboardList, Globe, Flag, ShieldCheck, CircleDashed, Activity, CheckCircle, AlertCircle, Clock, Search } from 'lucide-react';

const FRAMEWORKS = [
  { name: 'NIST PQC (FIPS 203/204/205)',       status: 'partial',   coverage: 10, details: '1/10 assets fully FIPS compliant',                                       Icon: FlaskConical },
  { name: 'RBI Digital Payment Security',       status: 'compliant', coverage: 85, details: 'Encryption controls active, PQC migration in progress',                   Icon: Building2 },
  { name: 'PCI-DSS v4.0 Requirement 4',         status: 'partial',   coverage: 60, details: 'TLS 1.3 migration in progress for payment assets',                       Icon: CreditCard },
  { name: 'ISO 27001:2022 (A.8.24, A.5.14)',   status: 'compliant', coverage: 90, details: 'Cryptographic lifecycle management active, audit trail maintained',       Icon: ClipboardList },
  { name: 'GDPR Article 32',                    status: 'compliant', coverage: 80, details: 'State-of-art encryption measures implemented',                           Icon: Globe },
  { name: 'India DPDP Act 2023',                status: 'compliant', coverage: 75, details: 'Personal data protection controls active',                              Icon: Flag },
];

const AUDIT_DATA = [
  { date: '2026-03-10', action: 'Quarterly PQC compliance assessment completed', user: 'admin', result: 'Partial' },
  { date: '2026-03-01', action: 'Quantum-safe certificate issued for swift.pnb.co.in', user: 'system', result: 'Pass' },
  { date: '2026-02-15', action: 'ISO 27001 internal audit — cryptographic controls review', user: 'auditor01', result: 'Pass' },
  { date: '2026-02-01', action: 'RBI Digital Payment Security self-assessment submitted', user: 'admin', result: 'Pass' },
  { date: '2026-01-15', action: 'PCI-DSS v4.0 Req 4 gap analysis completed', user: 'analyst01', result: 'Gaps Found' },
];

const statusConfig = {
  compliant: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', label: 'Compliant', Icon: CheckCircle },
  partial: { color: '#eab308', bg: 'rgba(234,179,8,0.1)', label: 'Partial', Icon: Clock },
  'non-compliant': { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', label: 'Non-Compliant', Icon: AlertCircle },
};

export default function Compliance() {
  const [frameworkSearch, setFrameworkSearch] = useState('');
  const [auditSearch, setAuditSearch] = useState('');

  const filteredFrameworks = FRAMEWORKS.filter(fw => 
    fw.name.toLowerCase().includes(frameworkSearch.toLowerCase()) || 
    fw.details.toLowerCase().includes(frameworkSearch.toLowerCase()) ||
    fw.status.toLowerCase().includes(frameworkSearch.toLowerCase())
  );

  const filteredAudit = AUDIT_DATA.filter(entry => 
    entry.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
    entry.user.toLowerCase().includes(auditSearch.toLowerCase()) ||
    entry.result.toLowerCase().includes(auditSearch.toLowerCase()) ||
    entry.date.includes(auditSearch)
  );

  return (
    <div className="fade-in">
      <div className="page-title-bar">
        <div>
          <h1 className="page-title">Compliance Dashboard</h1>
          <p className="page-subtitle">Regulatory compliance status across RBI, PCI-DSS, ISO 27001, GDPR, and DPDP</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="card" style={{ padding: '24px', borderLeft: '4px solid #22c55e', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', fontWeight: 600 }}>Frameworks Compliant</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#22c55e', lineHeight: 1 }}>4</div>
          </div>
          <ShieldCheck size={48} color="#22c55e" style={{ opacity: 0.15 }} />
        </div>
        
        <div className="card" style={{ padding: '24px', borderLeft: '4px solid #eab308', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', fontWeight: 600 }}>Partially Compliant</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#eab308', lineHeight: 1 }}>2</div>
          </div>
          <CircleDashed size={48} color="#eab308" style={{ opacity: 0.15 }} />
        </div>
        
        <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--cyan)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', fontWeight: 600 }}>Overall Compliance Rate</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>66.7<span style={{ fontSize: '1.2rem', color: 'var(--cyan)', marginLeft: '4px' }}>%</span></div>
          </div>
          <Activity size={48} color="var(--cyan)" style={{ opacity: 0.15 }} />
        </div>
      </div>

      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="card-title">Compliance Framework Status</span>
          <div className="search-input-wrap" style={{ minWidth: 250, height: 32, flex: 'none' }}>
            <Search size={14} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search frameworks..." 
              value={frameworkSearch} 
              onChange={e => setFrameworkSearch(e.target.value)} 
            />
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="data-table-wrap" style={{ borderRadius: 0, border: 'none' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Framework & Details</th>
                  <th style={{ width: '220px' }}>Readiness Progress</th>
                  <th style={{ width: '130px', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredFrameworks.map((fw) => {
                  const st = statusConfig[fw.status];
                  return (
                    <tr key={fw.name}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,200,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <fw.Icon size={18} color="var(--text-cyan)" strokeWidth={1.5} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>{fw.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{fw.details}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div className="compliance-bar" style={{ width: 140, flexShrink: 0 }}>
                            <div className="fill" style={{ width: `${fw.coverage}%`, background: st.color }} />
                          </div>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: st.color, width: 40, textAlign: 'right' }}>{fw.coverage}%</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="score-badge" style={{ background: st.bg, color: st.color, display: 'inline-flex', width: '100px', justifyContent: 'center', gap: 6 }}>
                          <st.Icon size={12} /> {st.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filteredFrameworks.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>No frameworks match your search query.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="card-title">Audit Trail</span>
          <div className="search-input-wrap" style={{ minWidth: 250, height: 32, flex: 'none' }}>
            <Search size={14} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search audit trail..." 
              value={auditSearch} 
              onChange={e => setAuditSearch(e.target.value)} 
            />
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="data-table-wrap" style={{ borderRadius: 0, border: 'none' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '120px' }}>Date</th>
                  <th>Action / Event</th>
                  <th style={{ width: '120px' }}>User</th>
                  <th style={{ width: '100px', textAlign: 'center' }}>Result</th>
                </tr>
              </thead>
              <tbody>
                {filteredAudit.map((entry, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{entry.date}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{entry.action}</td>
                    <td className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{entry.user}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`score-badge ${entry.result === 'Pass' ? 'safe' : entry.result === 'Partial' ? 'moderate' : 'high'}`} style={{ display: 'inline-flex', width: '80px', justifyContent: 'center' }}>
                        {entry.result}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredAudit.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>No audit events match your search query.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
