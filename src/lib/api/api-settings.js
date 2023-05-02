export const API_URL = import.meta.env.PROD
	? // ? 'https://learning-with-games-server-production.up.railway.app'
	  'https://learning-with-games-server.onrender.com'
	: 'http://localhost:8080';
export const API_VERSION = 'v1';
