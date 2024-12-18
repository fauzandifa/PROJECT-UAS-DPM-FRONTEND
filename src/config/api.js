// src/config/api.js
export const API_BASE_URL = 'http://10.0.2.2:5000/api';  // Untuk Android Emulator
// Atau gunakan IP lokal Anda jika menggunakan perangkat fisik
// export const API_BASE_URL = 'http://192.168.1.X:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};