import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Layers, ShieldCheck, ShieldAlert, CheckCircle2,
  Lock, Zap, ArrowUpRight,
} from 'lucide-react';
import { dashboardAPI } from '../../services/apiService';
import { geoAssets as GEO_FALLBACK, recentActivity as ACTIVITY_FALLBACK, scoreHistory } from '../../mockData';

/* ── Animated counter ────────────────────────────────────── */
function Counter({ target, decimals = 0, duration = 1200 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((ease * target).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, decimals, duration]);
  return <>{decimals ? val.toFixed(decimals) : val}</>;
}

/* ── Stat card ───────────────────────────────────────────── */
function StatCard({ Icon, label, value, decimals, color, bg, badge, badgeColor, trend }) {
  return (
    <div className="stat-card">
      <div className="stat-card-accent" style={{ background: bg }} />
      <div className="stat-icon-wrap" style={{ background: bg }}>
        <Icon size={20} color={color} strokeWidth={1.75} />
      </div>
      <div className="stat-value" style={{ color }}>
        <Counter target={value} decimals={decimals} />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-badge" style={{ background:`${badgeColor}22`, color:badgeColor, display:'flex', alignItems:'center', gap:4 }}>
        {trend === 'up' ? <ArrowUpRight size={12}/> : <ArrowUpRight size={12} style={{ transform:'rotate(90deg)' }}/>}
        {badge}
      </div>
    </div>
  );
}

/* ── Leaflet satellite map ──────────────────────────── */
function GeoMap({ points }) {
  const markers = points.length ? points : GEO_FALLBACK;
  const hub = markers.find(m => m.city === 'Delhi') || markers[0];

  return (
    <div style={{ height: 220, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-subtle)', position: 'relative' }}>
      <MapContainer
        center={[20, 70]}
        zoom={3}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri"
        />

        {/* Global Connection Lines */}
        {hub && markers.map((a, i) => {
          if (a.city === hub.city) return null;
          return (
            <Polyline
              key={`line-${a.city || i}`}
              positions={[ [hub.lat, hub.lng], [a.lat, a.lng] ]}
              pathOptions={{
                color: '#00c8ff',
                weight: 1.5,
                opacity: 0.5,
                dashArray: '4, 6',
                lineJoin: 'round'
              }}
            />
          );
        })}

        {/* Node Markers */}
        {markers.map((a, i) => (
          <CircleMarker
            key={a.city || a.hostname || i}
            center={[a.lat, a.lng]}
            radius={6 + (a.count || 4) / 5}
            pathOptions={{
              color: i < 5 ? '#00c8ff' : '#ffaa00',
              fillColor: i < 5 ? '#00c8ff' : '#ffaa00',
              fillOpacity: 0.85,
              weight: 2,
            }}
          >
            <LeafletTooltip 
              permanent 
              direction="right" 
              offset={[10, 0]} 
              className="crypto-tooltip"
            >
              {a.city || a.hostname}
            </LeafletTooltip>
            <Popup>
              <div style={{ fontFamily: 'monospace', fontSize: 12, lineHeight: 1.5 }}>
                <strong>{a.city || a.hostname}</strong><br />
                Assets: <strong>{a.count || 1}</strong>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

/* ── Custom tooltip ──────────────────────────────────────── */
const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background:'var(--bg-card)', border:'1px solid var(--border-mid)',
      borderRadius:6, padding:'8px 12px', fontSize:12,
    }}>
      <div style={{ color:'var(--text-muted)', marginBottom:4 }}>{label}</div>
      <div style={{ color:'var(--text-cyan)', fontWeight:600 }}>
        Score: {payload[0].value}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [metrics, setMetrics]   = useState(null);
  const [activity, setActivity] = useState(ACTIVITY_FALLBACK);
  const [geoPoints, setGeoPoints] = useState([]);

  useEffect(() => {
    // Fetch live metrics from backend
    dashboardAPI.getMetrics()
      .then(setMetrics)
      .catch(() => {/* silently fall back to mock counters */});

    dashboardAPI.getRecentActivity()
      .then(data => {
        // Map backend shape → component shape
        const mapped = data.map((a, i) => ({
          id: a.id || i,
          color: a.severity === 'danger'  ? '#ef4444'
               : a.severity === 'success' ? '#10b981'
               : a.severity === 'warning' ? '#f59e0b'
               : '#00c8ff',
          text: a.message,
          time: a.time,
        }));
        setActivity(mapped);
      })
      .catch(() => {/* keep ACTIVITY_FALLBACK */});

    dashboardAPI.getGeo()
      .then(data => { if (data?.length) setGeoPoints(data); })
      .catch(() => {});
  }, []);

  // KPI values: prefer live backend data, fall back to mock
  const total   = metrics?.total_assets   ?? 128;
  const pqcAvg  = metrics?.avg_pqc_score  ?? 43.4;
  const atRisk  = metrics?.at_risk_count  ?? 60;
  const pqcReady = metrics?.pqc_ready_count ?? 10;

  const stats = [
    { Icon:Layers,       label:'Total Public Assets',  value:total,   decimals:0, color:'var(--cyan)',    bg:'var(--cyan-dim)',    badge:'2% this week', badgeColor:'var(--success)', trend:'up' },
    { Icon:ShieldCheck,  label:'Enterprise PQC Score', value:pqcAvg,  decimals:1, color:'var(--purple)',  bg:'var(--purple-dim)', badge:'2% this week', badgeColor:'var(--success)', trend:'up' },
    { Icon:ShieldAlert,  label:'Assets at Risk (<40)', value:atRisk,  decimals:0, color:'var(--danger)',  bg:'var(--danger-dim)', badge:'2% this week', badgeColor:'var(--warning)', trend:'down' },
    { Icon:CheckCircle2, label:'PQC Ready (≥70)',      value:pqcReady,decimals:0, color:'var(--success)', bg:'var(--success-dim)',badge:'2% this week', badgeColor:'var(--success)', trend:'up' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Enterprise Dashboard</h1>
          <p className="page-subtitle">Real-time oversight of cryptographic assets and quantum readiness</p>
        </div>
      </div>

      {/* KPI stats */}
      <div className="stat-grid">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Main content grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:16 }}>

        {/* Left column */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* PQC Score Trend */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">PQC Score Trend</span>
              <span className="badge badge-cyan">Last 7 months</span>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={scoreHistory} margin={{ top:5, right:10, bottom:0, left:-10 }}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#00c8ff" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#00c8ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill:'var(--text-muted)', fontSize:11 }} axisLine={false} tickLine={false}/>
                  <YAxis domain={[36,46]} tick={{ fill:'var(--text-muted)', fontSize:11 }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<ChartTip />} />
                  <Area type="monotone" dataKey="score" stroke="var(--cyan)" strokeWidth={2} fill="url(#scoreGrad)" dot={{ r:3, fill:'var(--cyan)', stroke:'var(--bg-card)', strokeWidth:2 }}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Geographic Asset Distribution</span>
              <span className="badge badge-success" style={{ gap:5, display:'flex', alignItems:'center' }}>
                <span style={{ width:6, height:6, background:'var(--success)', borderRadius:'50%', display:'inline-block' }}/>
                Live
              </span>
            </div>
            <div className="card-body">
              <GeoMap points={geoPoints} />
              <div style={{ display:'flex', gap:8, marginTop:12, flexWrap:'wrap' }}>
                {(geoPoints.length ? geoPoints : GEO_FALLBACK).slice(0,5).map(a => (
                  <div key={a.city || a.hostname} style={{
                    display:'flex', alignItems:'center', gap:5,
                    padding:'3px 8px',
                    background:'var(--bg-secondary)',
                    border:'1px solid var(--border-subtle)',
                    borderRadius:4, fontSize:11, color:'var(--text-muted)',
                  }}>
                    <span style={{ width:6, height:6, background:'var(--cyan)', borderRadius:'50%' }}/>
                    {a.city || a.hostname} · {a.count || 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Asset type mini summary */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
            {[
              { label:'Web Apps', value:42, color:'var(--cyan)' },
              { label:'APIs',     value:26, color:'var(--purple)' },
              { label:'Servers',  value:37, color:'var(--gold)' },
              { label:'Other',    value:23, color:'var(--success)' },
            ].map(a => (
              <div key={a.label} className="card" style={{ textAlign:'center', padding:'16px 12px' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:700, color:a.color }}>
                  <Counter target={a.value} />
                </div>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — Activity Feed */}
        <div className="card" style={{ display:'flex', flexDirection:'column' }}>
          <div className="card-header">
            <span className="card-title">Recent Activity</span>
            <button className="btn btn-ghost btn-sm">View all</button>
          </div>
          <div className="card-body" style={{ flex:1, overflowY:'auto' }}>
            {activity.map((a, i) => (
              <div key={a.id} className="activity-item" style={{ animationDelay:`${i*0.06}s` }}>
                <div className="activity-dot" style={{ background:a.color, boxShadow:`0 0 6px ${a.color}` }} />
                <div>
                  <div className="activity-text">{a.text}</div>
                  <div className="activity-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom risk cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginTop:16 }}>
        {[
          { label:'Expiring Certificates', value:9,     color:'var(--warning)', Icon:Lock,       desc:'Within 30 days' },
          { label:'High Risk Assets',      value:14,    color:'var(--danger)',  Icon:Zap,        desc:'Immediate attention required' },
          { label:'PQC Migration Progress',value:'45%', color:'var(--purple)',  Icon:ArrowUpRight,desc:'Net banking migration' },
        ].map(c => (
          <div key={c.label} className="card animate-slide-up">
            <div className="card-body" style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{
                width:44, height:44, borderRadius:10,
                background:`${c.color}18`,
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>
                <c.Icon size={22} color={c.color} strokeWidth={1.75} />
              </div>
              <div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:700, color:c.color, lineHeight:1 }}>
                  {c.value}
                </div>
                <div style={{ fontSize:13, fontWeight:500, color:'var(--text-primary)', marginTop:2 }}>{c.label}</div>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:1 }}>{c.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
