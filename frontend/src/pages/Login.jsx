import React, { useState } from 'react';
import { authAPI } from '../services/apiService';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await authAPI.login({ username, password, otp: '' });
      localStorage.setItem('qsentra_token', res.access_token);
      localStorage.setItem('qsentra_user', JSON.stringify(res.user));
      setTimeout(() => { setLoading(false); onLogin(); }, 600);
    } catch (err) {
      setError('Authentication failed. Check credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <img src="/logo.png" alt="Q-Sentra Logo" style={{ width: '100%', maxWidth: '280px', height: 'auto', objectFit: 'contain' }} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Quantum-Proof Cryptographic Asset Management
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Punjab National Bank — Cybersecurity Division
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} autoFocus />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          {error && <div style={{ color: '#ef4444', fontSize: '0.82rem', marginBottom: 16 }}>{error}</div>}
          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['TLS 1.3', 'AES-256'].map(tag => (
              <span key={tag} style={{ fontSize: '0.65rem', padding: '3px 8px', borderRadius: 12, background: 'var(--accent-glow)', color: 'var(--accent-secondary)', fontWeight: 500 }}>{tag}</span>
            ))}
          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 16 }}>
            Protected by quantum-safe authentication protocols
          </p>
        </div>
      </div>
    </div>
  );
}
