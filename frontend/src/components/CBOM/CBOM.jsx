import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { cbomData } from '../../mockData';
import { downloadCSV } from '../../utils';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background:'var(--bg-card)', border:'1px solid var(--border-mid)',
      borderRadius:6, padding:'8px 12px', fontSize:12,
    }}>
      <div style={{ color:'var(--text-muted)', marginBottom:2 }}>{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{ color:p.fill || p.color, fontWeight:600 }}>{p.value}</div>
      ))}
    </div>
  );
};

function CipherUsageList({ data }) {
  const max = Math.max(...data.map(d=>d.count));
  return (
    <div>
      {data.map((d, i) => (
        <div key={i} className="cipher-row">
          <div className="cipher-name">{d.name}</div>
          <div className="cipher-bar-track">
            <div className="cipher-bar-fill" style={{
              width:`${(d.count/max)*100}%`,
              background:d.fill,
              transition:`width ${0.8 + i*0.1}s var(--ease-out)`,
            }}/>
          </div>
          <div className="cipher-count" style={{ color:d.fill }}>{d.count}</div>
        </div>
      ))}
    </div>
  );
}

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.08 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontFamily="var(--font-mono)">
      {`${(percent*100).toFixed(0)}%`}
    </text>
  ) : null;
};

export default function CBOM() {
  const navigate = useNavigate();
  const { totalApps, sitesSurveyed, activeCerts, weakCrypto, certIssues,
          keyLengthDist, cipherUsage, topCAs, encryptionProtocols, appCerts } = cbomData;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Cryptographic Bill of Materials</h1>
          <p className="page-subtitle">Complete visibility into cryptographic posture across all assets</p>
        </div>
        <button className="btn btn-outline" onClick={() => downloadCSV(appCerts, 'cbom_report.csv')}>Export CBOM Report</button>
      </div>

      {/* Top stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:20 }}>
        {[
          { label:'Total Applications', value:totalApps,     color:'var(--text-primary)' },
          { label:'Sites Surveyed',      value:sitesSurveyed, color:'var(--cyan)' },
          { label:'Active Certificates', value:activeCerts,   color:'var(--success)' },
          { label:'Weak Cryptography',   value:weakCrypto,    color:'var(--warning)' },
          { label:'Certificate Issues',  value:certIssues,    color:'var(--danger)' },
        ].map((s,i) => (
          <div key={s.label} className="card animate-slide-up" style={{ animationDelay:`${i*0.07}s`, padding:'16px 18px' }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, marginBottom:16 }}>

        {/* Key length dist */}
        <div className="card animate-slide-up d1">
          <div className="card-header"><span className="card-title">Key Length Distribution</span></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={keyLengthDist} margin={{ top:5, right:5, bottom:0, left:-20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,200,255,0.06)" />
                <XAxis dataKey="name" tick={{ fill:'var(--text-muted)', fontSize:11 }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill:'var(--text-muted)', fontSize:11 }} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[4,4,0,0]}>
                  {keyLengthDist.map((e,i) => <Cell key={i} fill={e.fill}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top CAs */}
        <div className="card animate-slide-up d2">
          <div className="card-header"><span className="card-title">Top Certificate Authorities</span></div>
          <div className="card-body" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={topCAs} cx="50%" cy="50%" outerRadius={70} dataKey="value" labelLine={false} label={renderLabel}>
                  {topCAs.map((e,i) => <Cell key={i} fill={e.fill}/>)}
                </Pie>
                <Legend iconType="circle" iconSize={8} formatter={(v) => (
                  <span style={{ color:'var(--text-secondary)', fontSize:11 }}>{v}</span>
                )}/>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Encryption protocols */}
        <div className="card animate-slide-up d3">
          <div className="card-header"><span className="card-title">Encryption Protocols</span></div>
          <div className="card-body" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={encryptionProtocols} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" labelLine={false} label={renderLabel}>
                  {encryptionProtocols.map((e,i) => <Cell key={i} fill={e.fill}/>)}
                </Pie>
                <Legend iconType="circle" iconSize={8} formatter={(v) => (
                  <span style={{ color:'var(--text-secondary)', fontSize:11 }}>{v}</span>
                )}/>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cipher Usage */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
        <div className="card animate-slide-up d2">
          <div className="card-header"><span className="card-title">Cipher Suite Usage</span></div>
          <div className="card-body">
            <CipherUsageList data={cipherUsage} />
          </div>
        </div>

        {/* App details table */}
        <div className="card animate-slide-up d3">
          <div className="card-header">
            <span className="card-title">Application Cryptographic Details</span>
          </div>
          <div className="card-body" style={{ padding:0 }}>
            <div className="data-table-wrap" style={{ borderRadius:0, border:'none' }}>
              <table className="data-table">
                <thead><tr>
                  <th>Application</th><th>Key Length</th><th>Cipher</th><th>CA</th>
                </tr></thead>
                <tbody>
                  {appCerts.map((a, i) => (
                    <tr key={i}>
                      <td className="mono" style={{ fontSize:11 }}>{a.app}</td>
                      <td>
                        <span className={`badge ${a.keyLength.includes('1024') ? 'badge-danger' : a.keyLength.includes('2048') ? 'badge-warning' : 'badge-success'}`}>
                          {a.keyLength}
                        </span>
                      </td>
                      <td style={{ fontSize:10, fontFamily:'var(--font-mono)', maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        <span style={{ color: a.status==='critical' ? 'var(--danger)' : 'var(--text-muted)' }}>{a.cipher}</span>
                      </td>
                      <td><span className="badge badge-muted">{a.ca}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Weak crypto alert */}
      <div style={{
        background:'rgba(239,68,68,0.06)',
        border:'1px solid rgba(239,68,68,0.2)',
        borderRadius:8, padding:'14px 18px',
        display:'flex', alignItems:'center', gap:12,
      }}>
        <span style={{ fontSize:20 }}>⚠️</span>
        <div>
          <div style={{ fontWeight:600, color:'var(--danger)', fontSize:14 }}>Weak Cryptography Detected</div>
          <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>
            22 assets are using deprecated cipher suites or insufficient key lengths (&lt;2048-bit). 
            Immediate remediation recommended — these are quantum-vulnerable.
          </div>
        </div>
        <button className="btn btn-outline btn-sm" style={{ marginLeft:'auto', borderColor:'rgba(239,68,68,0.4)', color:'var(--danger)', flexShrink:0 }} onClick={() => navigate('/remediation')}>
          View Remediation
        </button>
      </div>
    </div>
  );
}
