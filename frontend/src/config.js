/**
 * Q-Sentra Environment Configuration
 * Auto-detects local dev vs production (Vercel) environment.
 */

const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

// In production (Vercel), route API calls to the Render backend.
// In development, use the Vite proxy (empty string = same origin).
export const API_BASE_URL = isProduction
  ? 'https://qsentra-backend.onrender.com'
  : '';

export default API_BASE_URL;
