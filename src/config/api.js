// Ganti IP sesuai dengan IP/domain server Anda
const BASE_URL = 'http://192.168.212.37:5000/api';  // Sesuaikan dengan IP address server Anda

// Endpoint-endpoint API
export const API_ENDPOINTS = {
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,
  profile: `${BASE_URL}/auth/profile`,
  // Tambahkan endpoint lain sesuai kebutuhan
};

export default API_ENDPOINTS;