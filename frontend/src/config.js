/**
 * Q-Sentra Environment Configuration
 *
 * Production: Direct cross-origin requests to Render backend.
 * Development: Vite proxy (same-origin).
 */

const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

export const API_BASE_URL = isProduction
  ? 'https://qsentra-backend.onrender.com'
  : '';

export default API_BASE_URL;
