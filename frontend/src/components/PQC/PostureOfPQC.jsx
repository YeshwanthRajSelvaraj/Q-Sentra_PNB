import React, { useState } from 'react';
import { PieChart, Pie, Cell, RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';
import { pqcPosture } from '../../mockData';

/* ── Score ring using SVG ────────────────────────────────── */
function ScoreRing({ value, max=100, size=140, color, label }) {
  const r = (size - 20) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / max) * circ;

  return (
    <div style={{ position:'relative', width:size, height:size, display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
      <svg width={size} height={size} style={{ transform:'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth={8}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={8}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition:'stroke-dashoffset 1.5s var(--ease-out)', filter:`drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div style={{ position:'absolute', textAlign:'center' }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:size/4.5, fontWeight:700, color, lineHeight:1 }}>{value}%</div>
        <div style={{ fontSize:10, color:'var(--text-muted)', marginTop:2 }}>{label}</div>
      </div>
    </div>
  );
}

/* ── Risk matrix ─────────────────────────────────────────── */
function RiskMatrix() {
  const levels = [3, 2, 1];
  const colors = [
    ['#ef4444','#ef4444','#f59e0b'],
    ['#ef4444','#f59e0b','#10b981'],
    ['#f59e0b','#10b981','#10b981'],
  ];
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:3, padding:4 }}>
      {levels.map((r, ri) =>
        [0,1,2].map(ci => (
          <div key={`${ri}-${ci}`} style={{
            height:36, borderRadius:4,
            background:`${colors[ri][ci]}22`,
            border:`1px solid ${colors[ri][ci]}44`,
          }}/>
        ))
      )}
    </div>
  );
}

const pieData = (p) => [
  { name:'Elite-PQC', value:p.elitePct,    fill:'#10b981' },
  { name:'Standard',  value:p.standardPct, fill:'#f59e0b' },
  { name:'Legacy',    value:p.legacyPct,   fill:'#ef4444' },
  { name:'Critical',  value:100-p.elitePct-p.standardPct-p.legacyPct, fill:'#ff1744' },
];

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.07) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  return (
    <text x={cx + r*Math.cos(-midAngle*RADIAN)} y={cy + r*Math.sin(-midAngle*RADIAN)}
      fill="white" textAnchor="middle" dominantBaseline="central" fontSize={9}>
      {`${(percent*100).toFixed(0)}%`}
    </text>
  );
};

export default function PostureOfPQC() {
  const p = pqcPosture;
  const [selectedApp, setSelectedApp] = useState(null);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Posture of PQC</h1>
          <p className="page-subtitle">Post-quantum cryptography readiness and compliance across the enterprise</p>
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-muted)' }}>
            Elite-PQC Ready: <span style={{ color:'var(--success)' }}>{p.elitePct}%</span>
          </span>
          <span style={{ color:'var(--text-muted)' }}>|</span>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-muted)' }}>
            Standard: <span style={{ color:'var(--warning)' }}>{p.standardPct}%</span>
          </span>
          <span style={{ color:'var(--text-muted)' }}>|</span>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-muted)' }}>
            Legacy: <span style={{ color:'var(--danger)' }}>{p.legacyPct}%</span>
          </span>
          <span style={{ color:'var(--text-muted)' }}>|</span>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-muted)' }}>
            Critical Apps: <span style={{ color:'var(--critical)' }}>{p.criticalCount}</span>
          </span>
        </div>
      </div>

      {/* Main compliance grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 300px', gap:16, marginBottom:16 }}>

        {/* Classification bar */}
        <div className="card animate-slide-up">
          <div className="card-header"><span className="card-title">Assets by Classification Grade</span></div>
          <div className="card-body" style={{ display:'flex', alignItems:'flex-end', gap:16 }}>
            {[
              { label:'Elite', value:p.classificationGrade.elite, color:'var(--success)', h:120 },
              { label:'Critical', value:p.classificationGrade.critical, color:'var(--danger)', h:20 },
              { label:'Standard', value:p.classificationGrade.standard, color:'var(--warning)', h:35 },
            ].map(b => (
              <div key={b.label} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:b.color }}>{b.value}</div>
                <div style={{
                  width:'100%', height:b.h,
                  background:`${b.color}22`,
                  border:`1px solid ${b.color}44`,
                  borderRadius:'6px 6px 0 0',
                  transition:'height 1.2s var(--ease-out)',
                }}/>
                <div style={{ fontSize:11, color:'var(--text-muted)' }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pie chart */}
        <div className="card animate-slide-up d1">
          <div className="card-header"><span className="card-title">Application Status</span></div>
          <div className="card-body" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16 }}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData(p)} cx="40%" cy="50%" outerRadius={75} innerRadius={35} dataKey="value" labelLine={false} label={renderLabel}>
                  {pieData(p).map((e,i) => <Cell key={i} fill={e.fill}/>)}
                </Pie>
                <Tooltip formatter={(v,n) => [`${v}%`, n]} contentStyle={{ background:'var(--bg-card)', border:'1px solid var(--border-mid)', borderRadius:6, fontSize:12 }}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ minWidth:110 }}>
              {pieData(p).map(d => (
                <div key={d.name} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:d.fill, flexShrink:0 }}/>
                  <span style={{ fontSize:11, color:'var(--text-secondary)' }}>{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk matrix */}
        <div className="card animate-slide-up d2">
          <div className="card-header"><span className="card-title">Risk Overview</span></div>
          <div className="card-body">
            <RiskMatrix />
            <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:6 }}>
              {[
                { color:'var(--danger)', label:'High Risk' },
                { color:'var(--warning)', label:'Medium Risk' },
                { color:'var(--success)', label:'Safe or No Risk' },
              ].map(l => (
                <div key={l.label} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'var(--text-muted)' }}>
                  <div style={{ width:10, height:10, background:`${l.color}44`, border:`1px solid ${l.color}66`, borderRadius:2 }}/>
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Assets + recommendations row */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>

        {/* Assets PQC support */}
        <div className="card animate-slide-up d2">
          <div className="card-header"><span className="card-title">Assets PQC Support Status</span></div>
          <div className="card-body" style={{ padding:0 }}>
            <div className="data-table-wrap" style={{ borderRadius:0, border:'none' }}>
              <table className="data-table">
                <thead><tr><th>Asset Name</th><th style={{ textAlign:'center' }}>PQC Support</th></tr></thead>
                <tbody>
                  {p.assets.map((a, i) => (
                    <tr key={i} style={{ cursor:'pointer' }} onClick={() => setSelectedApp(a)}>
                      <td className="mono" style={{ fontSize:11 }}>{a.name}</td>
                      <td style={{ textAlign:'center' }}>
                        {a.pqcSupport
                          ? <span style={{ color:'var(--success)', fontSize:16 }}>✓</span>
                          : <span style={{ color:'var(--danger)', fontSize:16 }}>✗</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recommendations + App details */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div className="card animate-slide-up d3">
            <div className="card-header"><span className="card-title">Improvement Recommendations</span></div>
            <div className="card-body">
              {p.improvements.map((rec, i) => (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:10,
                  padding:'8px 0',
                  borderBottom: i < p.improvements.length-1 ? '1px solid var(--border-faint)' : 'none',
                }}>
                  <div style={{
                    width:6, height:6, borderRadius:'50%',
                    background: i===0 ? 'var(--danger)' : i===1 ? 'var(--warning)' : 'var(--cyan)',
                    flexShrink:0,
                  }}/>
                  <span style={{ fontSize:12, color:'var(--text-secondary)' }}>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card animate-slide-up d4">
            <div className="card-header">
              <span className="card-title">App A Details</span>
            </div>
            <div className="card-body" style={{ padding:'12px 16px' }}>
              {[
                { label:'App', value: p.appDetails.name },
                { label:'Owner', value: p.appDetails.owner },
                { label:'Exposure', value: p.appDetails.exposure },
                { label:'TLS', value: p.appDetails.tls },
                { label:'Score', value: p.appDetails.score, color:'var(--danger)' },
                { label:'Status', value: p.appDetails.status, color:'var(--warning)' },
              ].map(row => (
                <div key={row.label} className="app-detail-row">
                  <span className="app-detail-label">{row.label}</span>
                  <span style={{ color: row.color || 'var(--text-secondary)', fontSize:12 }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Score rings */}
      <div style={{ display:'flex', gap:20, marginTop:16, justifyContent:'center', padding:'16px 0' }}>
        <ScoreRing value={p.elitePct}    color="var(--success)" label="Elite-PQC" />
        <ScoreRing value={p.standardPct} color="var(--warning)" label="Standard" />
        <ScoreRing value={p.legacyPct}   color="var(--danger)"  label="Legacy" />
        <ScoreRing value={p.criticalCount*10} max={100} color="var(--critical)" label="Critical" size={120} />
      </div>
    </div>
  );
}
