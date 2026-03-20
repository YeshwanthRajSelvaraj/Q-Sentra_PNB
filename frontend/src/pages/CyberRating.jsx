import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ratingAPI } from '../services/apiService';
import { cyberRating as RATING_FALLBACK } from '../mockData';

const tiers = [
  {
    tier:'Tier-1', name:'Elite',
    color:'var(--success)', bg:'var(--success-dim)',
    range:'>700',
    security:'Modern best-practice crypto posture',
    criteria:'TLS 1.2/1.3 only; Strong Ciphers (AES-GCM/ChaCha20); Forward Secrecy (ECDHE); certificate >2048-bit (prefer 3072/4096); no weak protocols; HSTS enabled',
    action:'Maintain Configuration; periodic monitoring; recommended baseline for public-facing apps',
    badge:'badge-success',
  },
  {
    tier:'Tier-2', name:'Standard',
    color:'var(--warning)', bg:'var(--warning-dim)',
    range:'400–700',
    security:'Acceptable enterprise configuration',
    criteria:'TLS 1.2 supported but legacy protocols allowed; Key >2048-bit; Mostly strong ciphers but backward compatibility; Forward secrecy optional',
    action:'Improve gradually; disable legacy protocols; standardise cipher suites',
    badge:'badge-warning',
  },
  {
    tier:'Tier-3', name:'Legacy',
    color:'var(--danger)', bg:'var(--danger-dim)',
    range:'<400',
    security:'Weak but still operational',
    criteria:'TLS 1.0/1.1 enabled; weak ciphers (CBC, 3DES); Forward secrecy missing; Key possibly 1024-bit',
    action:'Remediation required; upgrade TLS stack; rotate certificates; remove weak cipher suites',
    badge:'badge-danger',
  },
  {
    tier:'Critical', name:'Insecure',
    color:'var(--critical)', bg:'rgba(255,23,68,0.1)',
    range:'N/A',
    security:'Insecure / exploitable',
    criteria:'SSL v2/v3 enabled; Key <1024-bit; weak cipher suites (<112-bit security); known vulnerabilities',
    action:'Immediate action — block or isolate service; replace certificate and TLS config; patch vulnerabilities',
    badge:'badge-danger',
  },
];

const urlColor = score =>
  score > 70 ? 'var(--success)' : score > 40 ? 'var(--warning)' : 'var(--danger)';

/* ── Big score gauge ─────────────────────────────────────── */
function EnterpriseScore({ score }) {
  const max = 1000;
  const r = 72;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / max) * circ;
  const color = score > 700 ? '#10b981' : score > 400 ? '#f59e0b' : '#ef4444';
  const status = score > 700 ? 'Elite-PQC' : score > 400 ? 'Standard' : 'Legacy';

  return (
    <div style={{ display:'flex', alignItems:'center', gap:24, justifyContent:'center', padding:'24px 0' }}>
      <div style={{ position:'relative', width:180, height:180, flexShrink:0 }}>
        <svg width="180" height="180" style={{ transform:'rotate(-90deg)' }}>
          <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth={10}/>
          <circle cx="90" cy="90" r={r} fill="none"
            stroke={color} strokeWidth={10}
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition:'stroke-dashoffset 2s var(--ease-out)', filter:`drop-shadow(0 0 10px ${color})` }}
          />
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:38, fontWeight:800, color, lineHeight:1 }}>{score}</div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-muted)', marginTop:2 }}>/ 1000</div>
        </div>
      </div>
      <div>
        <div style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color, marginBottom:6 }}>{status}</div>
        <div style={{ fontSize:13, color:'var(--text-secondary)', marginBottom:12, maxWidth:240 }}>
          Indicates a stronger security posture across all enterprise assets
        </div>
        <div style={{ display:'flex', gap:8 }}>
          {[
            { label:'Legacy', range:'<400', c:'var(--danger)' },
            { label:'Standard', range:'400-700', c:'var(--warning)' },
            { label:'Elite-PQC', range:'>700', c:'var(--success)' },
          ].map(s => (
            <div key={s.label} style={{
              padding:'4px 10px', borderRadius:6,
              background:`${s.c}11`, border:`1px solid ${s.c}33`,
              fontSize:11, color:s.c, textAlign:'center',
            }}>
              <div style={{ fontWeight:600 }}>{s.label}</div>
              <div style={{ opacity:0.7, fontSize:10 }}>{s.range}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CyberRating() {
  const [data, setData] = useState(null);

  useEffect(() => {
    ratingAPI.get()
      .then(res => {
        // Normalise backend shape → component shape
        setData({
          score:    res.score     ?? RATING_FALLBACK.score,
          urlScores: (res.assetScores || []).map(a => ({
            url:   a.url,
            score: Math.round(a.score / 10), // backend gives /1000, need /100
            tier:  a.score >= 700 ? 'Elite' : a.score >= 400 ? 'Standard' : 'Legacy',
          })),
        });
      })
      .catch(() => setData(RATING_FALLBACK));
  }, []);

  const { score, urlScores } = data || RATING_FALLBACK;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Cyber Rating</h1>
          <p className="page-subtitle">Consolidated PQC security tier ratings for all enterprise assets</p>
        </div>
        <button className="btn btn-outline">Download Rating Report</button>
      </div>

      {/* Enterprise score */}
      <div className="card animate-slide-up" style={{ marginBottom:16 }}>
        <div className="card-header">
          <span className="card-title">Consolidated Enterprise-Level PQC Rating Score</span>
        </div>
        <div className="card-body">
          <EnterpriseScore score={score} />
        </div>
      </div>

      {/* URL scores + chart */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
        <div className="card animate-slide-up d1">
          <div className="card-header"><span className="card-title">Asset PQC Scores</span></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={urlScores} layout="vertical" margin={{ left:20, right:20, top:5, bottom:5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,200,255,0.06)" horizontal={false}/>
                <XAxis type="number" domain={[0,100]} tick={{ fill:'var(--text-muted)', fontSize:10 }} axisLine={false} tickLine={false}/>
                <YAxis type="category" dataKey="url" tick={{ fill:'var(--text-secondary)', fontSize:10, fontFamily:'var(--font-mono)' }} axisLine={false} tickLine={false} width={140}/>
                <Tooltip
                  contentStyle={{ background:'var(--bg-card)', border:'1px solid var(--border-mid)', borderRadius:6, fontSize:12 }}
                  cursor={{ fill:'rgba(0,200,255,0.05)' }}
                />
                <Bar dataKey="score" radius={[0,4,4,0]}>
                  {urlScores.map((e,i) => <Cell key={i} fill={urlColor(e.score)}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card animate-slide-up d2">
          <div className="card-header"><span className="card-title">URL Score Breakdown</span></div>
          <div className="card-body" style={{ padding:0 }}>
            <div className="data-table-wrap" style={{ borderRadius:0, border:'none' }}>
              <table className="data-table">
                <thead><tr><th>URL</th><th>PQC Score</th><th>Tier</th></tr></thead>
                <tbody>
                  {urlScores.map((u, i) => (
                    <tr key={i}>
                      <td className="mono" style={{ fontSize:11 }}>{u.url}</td>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <div style={{ flex:1, height:4, background:'var(--bg-secondary)', borderRadius:2, overflow:'hidden' }}>
                            <div style={{ width:`${u.score}%`, height:'100%', background:urlColor(u.score), borderRadius:2 }}/>
                          </div>
                          <span style={{ fontFamily:'var(--font-display)', fontWeight:700, color:urlColor(u.score), fontSize:13, minWidth:28 }}>{u.score}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${u.tier==='Elite'?'badge-success':u.tier==='Standard'?'badge-warning':'badge-danger'}`}>
                          {u.tier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Tier definitions */}
      <div className="card animate-slide-up d3">
        <div className="card-header"><span className="card-title">Tier Classification Reference</span></div>
        <div className="card-body" style={{ padding:'12px 16px' }}>
          {tiers.map((t, i) => (
            <div key={t.tier} className="tier-row" style={{ animationDelay:`${i*0.08}s` }}>
              <div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-muted)', letterSpacing:'0.1em' }}>{t.tier}</div>
                <div className="tier-num" style={{ color:t.color }}>{t.name}</div>
                <div style={{
                  padding:'3px 10px', background:t.bg, border:`1px solid ${t.color}33`,
                  borderRadius:10, fontSize:11, color:t.color, display:'inline-block', marginTop:4,
                }}>{t.range}</div>
              </div>
              <div className="tier-info">
                <div className="tier-title">{t.security}</div>
                <div className="tier-criteria">{t.criteria}</div>
              </div>
              <div style={{
                padding:'8px 14px', background:t.bg, border:`1px solid ${t.color}33`,
                borderRadius:6, fontSize:11, color:t.color, maxWidth:200, lineHeight:1.5,
              }}>
                {t.action}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
