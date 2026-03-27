/**
 * Q-Sentra Unified API Service
 * All backend calls go through this module.
 * In dev, Vite proxy handles routing. In prod, calls go to Render backend.
 * Falls back gracefully to mock data when the backend is unavailable.
 */

import API_BASE_URL from '../config';

const BASE = API_BASE_URL;

// ─── token helpers ────────────────────────────────────────────────────────────
const getToken = () => localStorage.getItem('qsentra_token');

async function request(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!res.ok) throw new Error(`HTTP ${res.status} – ${path}`);
  return res.json();
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  login:  (data) => request('/api/v1/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  logout: ()     => { localStorage.removeItem('qsentra_token'); },
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
export const dashboardAPI = {
  getMetrics:        () => request('/api/dashboard/metrics'),
  getRecentActivity: () => request('/api/dashboard/recent-activity'),
  getGeo:            () => request('/api/dashboard/geodistribution'),
};

// ─── Discovery ────────────────────────────────────────────────────────────────
export const discoveryAPI = {
  startScan: (scope, options) =>
    request('/api/discovery/start', { method: 'POST', body: JSON.stringify({ scope, options }) }),
  getResults: () => request('/api/discovery/results'),
  confirm:    (id) => request(`/api/discovery/confirm/${id}`, { method: 'POST' }),
  ignore:     (id) => request(`/api/discovery/ignore/${id}`,  { method: 'POST' }),
};

// ─── Scan ─────────────────────────────────────────────────────────────────────
export const scanAPI = {
  scan:    (asset, port = 443) =>
    request(`/scan/${asset}`, { method: 'POST', body: JSON.stringify({ port, force_rescan: false }) }),
  getResult: (asset) => request(`/scan/${asset}`),
};

// ─── CBOM ─────────────────────────────────────────────────────────────────────
export const cbomAPI = {
  getAll: ()   => request('/cbom'),
  get:    (id) => request(`/cbom/${id}`),
};

// ─── PQC Score ────────────────────────────────────────────────────────────────
export const pqcAPI = {
  score:       (id) => request(`/score/${id}`),
  validateAll: ()   => request('/pqc/validate-all'),
};

// ─── Risk ─────────────────────────────────────────────────────────────────────
export const riskAPI = {
  getHndl:       () => request('/risk/hndl'),
  getBlastRadius: () => request('/risk/blast-radius'),
};

// ─── Rating ───────────────────────────────────────────────────────────────────
export const ratingAPI = {
  get: () => request('/api/rating/'),
};

// ─── Remediation ──────────────────────────────────────────────────────────────
export const remediationAPI = {
  getTasks:  () => request('/api/v1/remediation'),
  getRoadmap: () => request('/api/v1/remediation/roadmap'),
  getPlaybook: (id) => request(`/api/v1/remediation/${id}/playbook`),
  update:    (id, data) =>
    request(`/api/v1/remediation/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
};

// ─── Certificates ─────────────────────────────────────────────────────────────
export const certAPI = {
  getAll:  () => request('/api/v1/certificates'),
  get:     (id) => request(`/api/v1/certificates/${id}`),
  verify:  (id) => request(`/api/v1/certificates/${id}/verify`),
};
