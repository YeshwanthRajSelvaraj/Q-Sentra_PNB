/**
 * Q-Sentra Environment Configuration
 *
 * All API requests use same-origin (empty string).
 * - In production: Vercel rewrites proxy /api/* → Render backend
 * - In development: Vite proxy does the same
 */

export const API_BASE_URL = '';

export default API_BASE_URL;
