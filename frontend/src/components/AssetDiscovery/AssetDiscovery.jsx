import React, { useState } from 'react';
import { domains, sslCerts, ipSubnets, software } from '../../mockData';

const statusBadge = s => {
  const m = {
    'New':           'badge-cyan',
    'Confirmed':     'badge-success',
    'False Positive':'badge-muted',
    'False/ignore':  'badge-muted',
  };
  return m[s] || 'badge-muted';
};

function DomainsTab() {
  const [sub, setSub] = useState('New');
  const subs = ['New (5)', 'False Positive (10)', 'Confirmed (2)', 'All (3)'];
  const filtered = sub.startsWith('All') ? domains : domains.filter(d => d.status === sub.split(' ')[0]);
  return (
    <>
      <div className="sub-tab-bar">
        {subs.map(s => (
          <button key={s} className={`sub-tab-btn${sub === s.split(' ')[0] ? ' active' : ''}`}
            onClick={() => setSub(s.split(' ')[0])}>{s}</button>
        ))}
      </div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead><tr>
            <th>Detection Date</th><th>Domain Name</th><th>Registration Date</th>
            <th>Registrar</th><th>Company</th><th>Status</th>
          </tr></thead>
          <tbody>
            {(sub.startsWith('All') ? domains : domains.filter(d => d.status === sub.split(' ')[0])).map((d,i) => (
              <tr key={i}>
                <td style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--text-muted)' }}>{d.detectionDate}</td>
                <td className="cyan mono" style={{ fontSize:12 }}>{d.domainName}</td>
                <td style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--text-muted)' }}>{d.registrationDate}</td>
                <td style={{ fontSize:12 }}>{d.registrar}</td>
                <td><span className="badge badge-gold">{d.company}</span></td>
                <td><span className={`badge ${statusBadge(d.status)}`}>{d.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function SSLTab() {
  return (
    <>
      <div className="sub-tab-bar">
        {['New (3)', 'False/ignore (9)', 'Confirmed', 'All (3)'].map(s => (
          <button key={s} className="sub-tab-btn">{s}</button>
        ))}
      </div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead><tr>
            <th>Detection Date</th><th>SSL SHA Fingerprint</th>
            <th>Valid From</th><th>Common Name</th><th>Company</th><th>Certificate Authority</th>
          </tr></thead>
          <tbody>
            {sslCerts.map((c, i) => (
              <tr key={i}>
                <td style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--text-muted)' }}>{c.detectionDate}</td>
                <td style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-muted)', maxWidth:180, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.sha}</td>
                <td style={{ fontSize:11, color:'var(--text-muted)' }}>{c.validFrom}</td>
                <td style={{ color:'var(--text-secondary)' }}>{c.commonName}</td>
                <td><span className="badge badge-gold">{c.company}</span></td>
                <td><span className="badge badge-cyan">{c.ca}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function IPTab() {
  return (
    <>
      <div className="sub-tab-bar">
        {['New (15)', 'False or ignore (10)', 'Confirmed (9)', 'All (34)'].map(s => (
          <button key={s} className="sub-tab-btn">{s}</button>
        ))}
      </div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead><tr>
            <th>Detection Date</th><th>IP Address</th><th>Ports</th>
            <th>Subnet</th><th>ASN</th><th>Netname</th><th>Location</th><th>Company</th>
          </tr></thead>
          <tbody>
            {ipSubnets.map((ip, i) => (
              <tr key={i}>
                <td style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--text-muted)' }}>{ip.detectionDate}</td>
                <td className="cyan mono" style={{ fontSize:12 }}>{ip.ip}</td>
                <td style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-secondary)' }}>{ip.ports}</td>
                <td style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-muted)' }}>{ip.subnet}</td>
                <td><span className="badge badge-muted">{ip.asn}</span></td>
                <td style={{ fontSize:12 }}>{ip.netname}</td>
                <td style={{ fontSize:12 }}>{ip.location}</td>
                <td style={{ fontSize:12, color:'var(--text-secondary)' }}>{ip.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function SoftwareTab() {
  return (
    <>
      <div className="sub-tab-bar">
        {['New (10)', 'False or ignore (6)', 'Confirmed (36)', 'All (52)'].map(s => (
          <button key={s} className="sub-tab-btn">{s}</button>
        ))}
      </div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead><tr>
            <th>Detection Date</th><th>Product</th><th>Version</th>
            <th>Type</th><th>Port</th><th>Host</th><th>Company</th>
          </tr></thead>
          <tbody>
            {software.map((s, i) => (
              <tr key={i}>
                <td style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--text-muted)' }}>{s.detectionDate}</td>
                <td className="primary">{s.product}</td>
                <td style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-muted)' }}>{s.version}</td>
                <td><span className="badge badge-purple">{s.type}</span></td>
                <td style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-secondary)' }}>{s.port}</td>
                <td className="mono" style={{ fontSize:11 }}>{s.host}</td>
                <td><span className="badge badge-gold">{s.company}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ── Simple network graph using SVG ──────────────────────── */
function NetworkGraph() {
  const nodes = [
    { id:'c', x:300, y:200, label:'pnb.co.in', type:'center', r:18, color:'#00c8ff' },
    { id:'n1', x:160, y:100, label:'portal', type:'web', r:12, color:'#10b981' },
    { id:'n2', x:440, y:100, label:'api', type:'api', r:12, color:'#a855f7' },
    { id:'n3', x:120, y:240, label:'vpn', type:'gateway', r:12, color:'#f59e0b' },
    { id:'n4', x:480, y:240, label:'mail', type:'server', r:12, color:'#10b981' },
    { id:'n5', x:220, y:320, label:'netbanking', type:'web', r:14, color:'#00c8ff' },
    { id:'n6', x:380, y:320, label:'treasury', type:'web', r:12, color:'#10b981' },
    { id:'n7', x:90,  y:150, label:'swift', type:'api', r:10, color:'#ef4444' },
    { id:'n8', x:510, y:160, label:'mobileapi', type:'api', r:10, color:'#ef4444' },
    { id:'s1', x:60,  y:80,  label:'AS9583', type:'subnet', r:8, color:'#3d5a7a' },
    { id:'s2', x:540, y:80,  label:'MSFT', type:'subnet', r:8, color:'#3d5a7a' },
    { id:'s3', x:300, y:50,  label:'103.107.0/22', type:'subnet', r:8, color:'#3d5a7a' },
  ];
  const edges = [
    ['c','n1'],['c','n2'],['c','n3'],['c','n4'],['c','n5'],['c','n6'],
    ['n1','n7'],['n2','n8'],['n3','s1'],['n4','s2'],['c','s3'],
    ['n5','n6'],['n1','n5'],
  ];
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <div style={{ background:'var(--bg-secondary)', borderRadius:8, overflow:'hidden', height:380 }}>
      <svg viewBox="0 0 600 380" style={{ width:'100%', height:'100%' }}>
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,200,255,0.3)" stopOpacity="1"/>
            <stop offset="100%" stopColor="rgba(0,200,255,0)" stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* Edges */}
        {edges.map(([a,b],i) => {
          const na = nodeMap[a], nb = nodeMap[b];
          return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke="rgba(0,200,255,0.12)" strokeWidth="1.5" strokeDasharray="4 4" />;
        })}
        {/* Nodes */}
        {nodes.map(n => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={n.r+6} fill={n.color} opacity={0.07}/>
            <circle cx={n.x} cy={n.y} r={n.r} fill={`${n.color}22`}
              stroke={n.color} strokeWidth={n.type==='center'?2:1} />
            <text x={n.x} y={n.y+n.r+11} textAnchor="middle"
              fontSize="9" fill={n.color} fontFamily="var(--font-mono)"
              opacity={0.8}>{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

const tabs = [
  { key:'domains',  label:`Domains`, count:20 },
  { key:'ssl',      label:`SSL`,     count:15 },
  { key:'ip',       label:`IP/Subnets`, count:34 },
  { key:'software', label:`Software`, count:52 },
  { key:'graph',    label:`Network Graph` },
];

export default function AssetDiscovery() {
  const [active, setActive] = useState('domains');

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Asset Discovery</h1>
          <p className="page-subtitle">Continuously monitored attack surface across all asset categories</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <div className="search-input-wrap" style={{ width:240 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color:'var(--text-muted)', flexShrink:0 }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input placeholder="Search domain, URL, IoC..." />
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display:'flex', gap:6, marginBottom:20, flexWrap:'wrap' }}>
        {tabs.map(t => (
          <button key={t.key} className={`tab-btn${active===t.key?' active':''}`}
            onClick={() => setActive(t.key)}>
            {t.label}{t.count ? <span style={{ marginLeft:6, opacity:0.6, fontSize:11 }}>({t.count})</span> : null}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="card-body">
          {active === 'domains'  && <DomainsTab />}
          {active === 'ssl'      && <SSLTab />}
          {active === 'ip'       && <IPTab />}
          {active === 'software' && <SoftwareTab />}
          {active === 'graph'    && (
            <div>
              <div style={{ marginBottom:12, fontSize:13, color:'var(--text-muted)' }}>
                Interactive network topology of discovered assets and their relationships
              </div>
              <NetworkGraph />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
