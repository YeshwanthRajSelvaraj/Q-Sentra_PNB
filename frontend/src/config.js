/**
 * Q-Sentra Environment Configuration
 * 
 * In PRODUCTION: Vercel rewrites proxy /api/* to the Render backend,
 * so we always use same-origin requests (empty string).
 * 
 * In DEVELOPMENT: Vite proxy does the same thing.
 * 
 * This eliminates CORS issues entirely.
 */

export const API_BASE_URL = '';

export default API_BASE_URL;
