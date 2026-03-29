export const UPLINK_CONFIG = {
    // Use environment variable for production, fallback to local for dev
    BASE_URL: import.meta.env.VITE_API_URL || 'https://api.1028bc.com',
    AUTH_KEY: '1028', // Brian's Master Key
    PROJECT: 'SolUrbana'
  };