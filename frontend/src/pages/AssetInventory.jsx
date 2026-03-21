import React, { useState, useMemo } from 'react';
import { assetInventory as initialInventory } from '../mockData';
import { downloadCSV } from '../utils';

const riskConfig = {
  Critical: { cls:'badge-danger',  label:'Critical' },
  High:     { cls:'badge-danger',  label:'High' },
  Medium:   { cls:'badge-warning', label:'Medium' },
  Low:      { cls:'badge-success', label:'Low' },
};
const certConfig = {
  Valid:    { cls:'badge-success', label:'✓ Valid' },
  Expiring: { cls:'badge-warning', label:'⚠ Expiring' },
  Expired:  { cls:'badge-danger',  label:'✗ Expired' },
};
const typeConfig = {
  'Web App': 'badge-cyan',
  'API':     'badge-purple',
  'Gateway': 'badge-gold',
  'Server':  'badge-muted',
};

const SortIcon = ({ dir }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft:4, opacity: dir ? 1 : 0.3 }}>
    {dir === 'asc' ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}
  </svg>
);

export default function AssetInventory() {
  const [assets, setAssets] = useState(initialInventory);
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [selected, setSelected] = useState(new Set());
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAsset, setNewAsset] = useState({
    name: '', ipv4: '', type: 'Web App', owner: '', risk: 'Medium', certStatus: 'Valid', keyLength: '2048-bit', ipv6: '-'
  });

  const data = useMemo(() => {
    let d = [...assets];
    if (search) d = d.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.ipv4.includes(search));
    if (riskFilter !== 'All') d = d.filter(a => a.risk === riskFilter);
    if (typeFilter !== 'All') d = d.filter(a => a.type === typeFilter);
    d.sort((a, b) => {
      const av = a[sortField], bv = b[sortField];
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return d;
  }, [assets, search, riskFilter, typeFilter, sortField, sortDir]);

  const toggleSort = field => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const toggleAll = () => {
    if (selected.size === data.length) setSelected(new Set());
    else setSelected(new Set(data.map(a => a.id)));
  };

  const handleAddSubmit = () => {
    if (!newAsset.name || !newAsset.ipv4) {
      alert("Name and IPv4 are required");
      return;
    }
    const asset = {
      ...newAsset,
      id: Date.now(),
      url: `https://${newAsset.name}`,
      lastScan: 'Just now'
    };
    setAssets(prev => [asset, ...prev]);
    setShowAddModal(false);
    setNewAsset({ name: '', ipv4: '', type: 'Web App', owner: '', risk: 'Medium', certStatus: 'Valid', keyLength: '2048-bit', ipv6: '-' });
  };

  const Th = ({ field, children }) => (
    <th style={{ cursor:'pointer', userSelect:'none' }} onClick={() => toggleSort(field)}>
      <span style={{ display:'flex', alignItems:'center' }}>
        {children}
        <SortIcon dir={sortField === field ? sortDir : null} />
      </span>
    </th>
  );

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Asset Inventory</h1>
          <p className="page-subtitle">All discovered public-facing cryptographic assets</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button className="btn btn-ghost" onClick={() => downloadCSV(data, 'asset_inventory.csv')}>Export CSV</button>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Asset
          </button>
        </div>
      </div>

      {/* Summary row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:20 }}>
        {[
          { label:'Total',       value:assets.length, color:'var(--text-primary)' },
          { label:'Web Apps',    value:assets.filter(a=>a.type==='Web App').length,  color:'var(--cyan)' },
          { label:'APIs',        value:assets.filter(a=>a.type==='API').length,  color:'var(--purple)' },
          { label:'Servers',     value:assets.filter(a=>a.type==='Server').length,  color:'var(--gold)' },
          { label:'Expiring',    value:assets.filter(a=>a.certStatus==='Expiring').length,   color:'var(--warning)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding:'12px 16px', textAlign:'center' }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:s.color }}>{s.value}</div>
            <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span className="card-title">Discovered Assets</span>
          
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
            <div className="search-input-wrap" style={{ minWidth: 250, height: 32, flex: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color:'var(--text-muted)', flexShrink:0 }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or IP..." />
            </div>
            
            <select className="filter-select" style={{ height: 32 }} value={riskFilter} onChange={e=>setRiskFilter(e.target.value)}>
              <option>All Risk</option>
              <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
            </select>
            
            <select className="filter-select" style={{ height: 32 }} value={typeFilter} onChange={e=>setTypeFilter(e.target.value)}>
              <option>All Types</option>
              <option>Web App</option><option>API</option><option>Gateway</option><option>Server</option>
            </select>
            
            <button className="btn btn-outline" style={{ height: 32, display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
              </svg>
              Scan All
            </button>
          </div>
        </div>

        <div className="card-body" style={{ padding: 0 }}>
          <div className="data-table-wrap" style={{ borderRadius: 0, border: 'none' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width:36, paddingLeft: 24 }}>
                    <input type="checkbox" checked={selected.size === data.length && data.length>0} onChange={toggleAll}
                      style={{ accentColor:'var(--cyan)', cursor:'pointer' }} />
                  </th>
                  <Th field="name">Asset Name</Th>
                  <Th field="ipv4">IPv4 Address</Th>
                  <th>IPv6 Address</th>
                  <Th field="type">Type</Th>
                  <Th field="owner">Owner</Th>
                  <Th field="risk">Risk</Th>
                  <th>Cert Status</th>
                  <Th field="keyLength">Key Length</Th>
                  <Th field="lastScan">Last Scan</Th>
                </tr>
              </thead>
              <tbody>
                {data.map((a, i) => (
                  <tr key={a.id} style={{ animationDelay:`${i*0.03}s` }}>
                    <td style={{ paddingLeft: 24 }}>
                      <input type="checkbox" checked={selected.has(a.id)} onChange={() => {
                        const s = new Set(selected);
                        s.has(a.id) ? s.delete(a.id) : s.add(a.id);
                        setSelected(s);
                      }} style={{ accentColor:'var(--cyan)', cursor:'pointer' }} />
                    </td>
                    <td className="primary">
                      <a href={a.url} target="_blank" rel="noreferrer" style={{ color:'var(--text-cyan)', textDecoration:'none', fontFamily:'var(--font-mono)', fontSize:12 }}>
                        {a.name}
                      </a>
                    </td>
                    <td className="mono">{a.ipv4}</td>
                    <td className="mono" style={{ fontSize:11, color:'var(--text-muted)' }}>{a.ipv6}</td>
                    <td><span className={`badge ${typeConfig[a.type] || 'badge-muted'}`}>{a.type}</span></td>
                    <td>{a.owner}</td>
                    <td><span className={`badge ${riskConfig[a.risk]?.cls}`}>{a.risk}</span></td>
                    <td><span className={`badge ${certConfig[a.certStatus]?.cls}`}>{certConfig[a.certStatus]?.label}</span></td>
                    <td className="mono" style={{ fontSize:12 }}>{a.keyLength}</td>
                    <td style={{ fontSize:11, color:'var(--text-muted)' }}>{a.lastScan}</td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={10} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>No assets match your search or filter configuration.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding: '16px 24px', fontSize:12, color:'var(--text-muted)', borderTop: '1px solid var(--border-faint)' }}>
            <span>Showing {data.length} of {assets.length} assets</span>
            <div style={{ display:'flex', gap:6 }}>
              {[1,2,3,'...'].map((p,i) => (
                <button key={i} className="btn btn-ghost btn-sm" style={{ minWidth:32, padding:'4px 8px', fontSize:12 }}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div style={{ position:'fixed', inset:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.6)', backdropFilter:'blur(4px)' }}>
          <div className="card animate-fade-in" style={{ width:400, padding:24, display:'flex', flexDirection:'column', gap:16, border:'1px solid var(--border-mid)' }}>
            <h3 style={{ fontSize:18, fontWeight:600, color:'var(--text-primary)' }}>Add New Asset</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <input 
                className="filter-select" 
                style={{ width:'100%', padding:'8px 12px' }} 
                placeholder="Asset Name (e.g. sub.domain.com)" 
                value={newAsset.name} 
                onChange={e=>setNewAsset({...newAsset, name: e.target.value})} 
              />
              <input 
                className="filter-select" 
                style={{ width:'100%', padding:'8px 12px' }} 
                placeholder="IPv4 Address" 
                value={newAsset.ipv4} 
                onChange={e=>setNewAsset({...newAsset, ipv4: e.target.value})} 
              />
              <div style={{ display:'flex', gap:12 }}>
                <select className="filter-select" style={{ flex:1, padding:'8px 12px' }} value={newAsset.type} onChange={e=>setNewAsset({...newAsset, type: e.target.value})}>
                  <option>Web App</option><option>API</option><option>Gateway</option><option>Server</option>
                </select>
                <select className="filter-select" style={{ flex:1, padding:'8px 12px' }} value={newAsset.risk} onChange={e=>setNewAsset({...newAsset, risk: e.target.value})}>
                  <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
                </select>
              </div>
              <div style={{ display:'flex', gap:12 }}>
                <input 
                  className="filter-select" 
                  style={{ flex:1, padding:'8px 12px' }} 
                  placeholder="Owner" 
                  value={newAsset.owner} 
                  onChange={e=>setNewAsset({...newAsset, owner: e.target.value})} 
                />
                <select className="filter-select" style={{ flex:1, padding:'8px 12px' }} value={newAsset.certStatus} onChange={e=>setNewAsset({...newAsset, certStatus: e.target.value})}>
                  <option>Valid</option><option>Expiring</option><option>Expired</option>
                </select>
              </div>
            </div>
            <div style={{ display:'flex', justifyContent:'flex-end', gap:12, marginTop:8 }}>
              <button className="btn btn-ghost" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddSubmit}>Save Asset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
