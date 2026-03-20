import React, { useState } from 'react';
import {
  Users, Calendar, Search, FileText, ShieldCheck, AlertTriangle,
  BarChart2, FileClock, Mail, HardDrive, Link2, MessageSquare,
  Settings, TrendingUp, Download, ArrowLeft,
} from 'lucide-react';

const reportTypes = [
  'Executive Summary Report',
  'Assets Discovery Report',
  'Assets Inventory Report',
  'CBOM Report',
  'Posture of PQC Report',
  'Cyber Rating (Tiers 1–4)',
];

function ScheduledForm() {
  const [enabled, setEnabled] = useState(true);
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:600, color:'var(--text-primary)' }}>Schedule Reporting</h3>
          <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Automate recurring reports to stakeholders</p>
        </div>
        {/* Toggle switch */}
        <div onClick={() => setEnabled(e=>!e)} style={{
          width:44, height:24, borderRadius:12, cursor:'pointer',
          background: enabled ? 'var(--cyan)' : 'var(--bg-secondary)',
          border:'1px solid var(--border-mid)',
          position:'relative', transition:'background 0.2s',
        }}>
          <div style={{
            position:'absolute', top:3, left: enabled ? 23 : 3,
            width:16, height:16, borderRadius:'50%',
            background:'white', transition:'left 0.2s',
            boxShadow:'0 1px 4px rgba(0,0,0,0.4)',
          }}/>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div>
            <label style={{ fontSize:12, color:'var(--text-muted)', display:'block', marginBottom:6 }}>Report Type</label>
            <select className="filter-select" style={{ width:'100%' }}>
              {reportTypes.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize:12, color:'var(--text-muted)', display:'block', marginBottom:6 }}>Frequency</label>
            <select className="filter-select" style={{ width:'100%' }}>
              <option>Daily</option><option>Weekly</option><option>Monthly</option><option>Quarterly</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize:12, color:'var(--text-muted)', display:'block', marginBottom:6 }}>Select Assets</label>
            <select className="filter-select" style={{ width:'100%' }}>
              <option>All Assets</option><option>High Risk Only</option><option>PQC Critical</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize:12, color:'var(--text-muted)', display:'block', marginBottom:8 }}>Include Sections</label>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {['Discovery','Inventory','CBOM','PQC Posture','Cyber Rating'].map(s => (
                <label key={s} style={{ display:'flex', alignItems:'center', gap:6, cursor:'pointer', fontSize:12, color:'var(--text-secondary)' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor:'var(--cyan)' }}/>{s}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-subtle)', borderRadius:8, padding:16 }}>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text-cyan)', marginBottom:12, display:'flex', alignItems:'center', gap:6 }}>
              <Calendar size={14}/> Schedule Details
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <div>
                <label style={{ fontSize:11, color:'var(--text-muted)', display:'block', marginBottom:4 }}>Date</label>
                <input type="date" defaultValue="2026-04-25"
                  style={{ width:'100%', background:'var(--bg-card)', border:'1px solid var(--border-subtle)', borderRadius:5, padding:'7px 10px', color:'var(--text-primary)', fontSize:13, outline:'none' }}/>
              </div>
              <div>
                <label style={{ fontSize:11, color:'var(--text-muted)', display:'block', marginBottom:4 }}>Time (IST)</label>
                <input type="time" defaultValue="09:00"
                  style={{ width:'100%', background:'var(--bg-card)', border:'1px solid var(--border-subtle)', borderRadius:5, padding:'7px 10px', color:'var(--text-primary)', fontSize:13, outline:'none' }}/>
              </div>
            </div>
          </div>

          <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-subtle)', borderRadius:8, padding:16 }}>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text-cyan)', marginBottom:12, display:'flex', alignItems:'center', gap:6 }}>
              <Mail size={14}/> Delivery Options
            </div>
            {[
              { label:'Email', sub:'executives@org.com', checked:true },
              { label:'Save to Location', sub:'/Reports/Quarterly/', checked:true },
              { label:'Download Link', sub:'Generate shareable link', checked:false },
            ].map(opt => (
              <label key={opt.label} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10, cursor:'pointer' }}>
                <input type="checkbox" defaultChecked={opt.checked} style={{ accentColor:'var(--cyan)', flexShrink:0 }}/>
                <div>
                  <div style={{ fontSize:13, color:'var(--text-secondary)' }}>{opt.label}</div>
                  <div style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-mono)' }}>{opt.sub}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop:20, display:'flex', justifyContent:'flex-end' }}>
        <button className="btn btn-primary">Schedule Report →</button>
      </div>
    </div>
  );
}

function OnDemandForm() {
  const [selectedType, setSelectedType] = useState('');
  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <h3 style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:600, color:'var(--text-primary)' }}>On-Demand Reporting</h3>
        <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Request reports as needed</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
        <div>
          <label style={{ fontSize:12, color:'var(--text-muted)', display:'block', marginBottom:6 }}>Report Type</label>
          <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-subtle)', borderRadius:8, overflow:'hidden' }}>
            <div style={{ padding:'8px 12px', fontSize:11, color:'var(--text-muted)', borderBottom:'1px solid var(--border-faint)' }}>
              Select Report
            </div>
            {reportTypes.map(r => (
              <div key={r} onClick={() => setSelectedType(r)}
                style={{
                  padding:'10px 14px', cursor:'pointer', fontSize:13,
                  color: selectedType===r ? 'var(--text-cyan)' : 'var(--text-secondary)',
                  background: selectedType===r ? 'var(--cyan-dim)' : 'transparent',
                  borderBottom:'1px solid var(--border-faint)',
                  transition:'all 0.15s',
                  display:'flex', alignItems:'center', gap:8,
                }}>
                <span style={{ display:'flex', alignItems:'center', color:'var(--text-muted)' }}>
                  {[BarChart2,Search,FileText,ShieldCheck,ShieldCheck,TrendingUp][reportTypes.indexOf(r)]({size:14})}
                </span>
                {r}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-subtle)', borderRadius:8, padding:16 }}>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text-cyan)', marginBottom:12, display:'flex', alignItems:'center', gap:6 }}>
              <Download size={14}/> Delivery Options
            </div>
            {[
              { label:'Send via Email',     Icon:Mail },
              { label:'Save to Location',   Icon:HardDrive, sub:'/Reports/OnDemand/' },
              { label:'Download Link',      Icon:Link2 },
              { label:'Slack Notification', Icon:MessageSquare },
            ].map(opt => (
              <label key={opt.label} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10, cursor:'pointer' }}>
                <input type="checkbox" defaultChecked={opt.label !== 'Slack Notification'} style={{ accentColor:'var(--cyan)', flexShrink:0 }}/>
                <opt.Icon size={14} color="var(--text-muted)" style={{ flexShrink:0 }} />
                <span style={{ marginRight:'auto', fontSize:13, color:'var(--text-secondary)' }}>{opt.label}</span>
              </label>
            ))}
          </div>

          <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-subtle)', borderRadius:8, padding:16 }}>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text-cyan)', marginBottom:12, display:'flex', alignItems:'center', gap:6 }}>
              <Settings size={14}/> Advanced Settings</div>
            <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--text-secondary)' }}>
                File Format:
                <select className="filter-select" style={{ height:28, fontSize:11 }}>
                  <option>PDF</option><option>XLSX</option><option>CSV</option>
                </select>
              </div>
              <label style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--text-secondary)', cursor:'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor:'var(--cyan)' }}/> Include Charts
              </label>
              <label style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--text-secondary)', cursor:'pointer' }}>
                <input type="checkbox" style={{ accentColor:'var(--cyan)' }}/> Password Protect
              </label>
            </div>
          </div>

          <button className="btn btn-primary" style={{ alignSelf:'flex-end', display:'flex', alignItems:'center', gap:6 }}>
            <BarChart2 size={15}/> Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}

function ExecutiveForm() {
  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <h3 style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:600, color:'var(--text-primary)' }}>Executive Reporting</h3>
        <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>High-level summaries for leadership and board review</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
        {[
          { title:'Q1 2026 Security Report',   date:'Mar 31, 2026', status:'Ready',    Icon:FileText },
          { title:'PQC Readiness Summary',     date:'Mar 15, 2026', status:'Ready',    Icon:ShieldCheck },
          { title:'Asset Risk Overview',       date:'Mar 1, 2026',  status:'Ready',    Icon:AlertTriangle },
          { title:'Compliance Status Report',  date:'Feb 28, 2026', status:'Archived', Icon:FileClock },
          { title:'Q4 2025 Security Report',   date:'Dec 31, 2025', status:'Archived', Icon:BarChart2 },
          { title:'Annual Crypto Audit 2025',  date:'Dec 15, 2025', status:'Archived', Icon:Search },
        ].map(r => (
          <div key={r.title} className="card" style={{ padding:'14px 16px', cursor:'pointer', transition:'all 0.2s' }}>
            <div style={{ marginBottom:10 }}>
              <r.Icon size={22} color="var(--text-cyan)" strokeWidth={1.5}/>
            </div>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)', marginBottom:4 }}>{r.title}</div>
            <div style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-mono)' }}>{r.date}</div>
            <div style={{ marginTop:8 }}>
              <span className={`badge ${r.status==='Ready' ? 'badge-success' : 'badge-muted'}`}>{r.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const panels = [
  { key:'executive', label:'Executive Reporting', Icon:Users,    desc:'Board-level and leadership summaries' },
  { key:'scheduled', label:'Scheduled Reporting', Icon:Calendar, desc:'Automate recurring reports to stakeholders' },
  { key:'ondemand',  label:'On-Demand Reporting', Icon:Search,   desc:'Request any report as needed' },
];

export default function Reporting() {
  const [active, setActive] = useState(null);

  if (!active) {
    return (
      <div className="animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Reporting</h1>
            <p className="page-subtitle">Generate, schedule, and distribute security reports</p>
          </div>
        </div>
        <div className="report-option-grid">
          {panels.map(p => (
            <div key={p.key} className="report-card animate-slide-up" onClick={() => setActive(p.key)}>
              <div className="report-card-icon" style={{ display:'flex', justifyContent:'center' }}>
                <p.Icon size={40} color="var(--text-cyan)" strokeWidth={1.25} />
              </div>
              <div className="report-card-title">{p.label}</div>
              <div className="report-card-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">{panels.find(p=>p.key===active)?.label}</h1>
        </div>
        <button className="btn btn-ghost" onClick={() => setActive(null)} style={{ display:'flex', alignItems:'center', gap:6 }}>
          <ArrowLeft size={15}/> Back
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          {active === 'executive' && <ExecutiveForm />}
          {active === 'scheduled' && <ScheduledForm />}
          {active === 'ondemand'  && <OnDemandForm />}
        </div>
      </div>
    </div>
  );
}
