// api/auth.js
const API_URL = 'http://your-server:3000/api';

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error saat registrasi');
  }
};

// api/booking.js
export const createBooking = async (bookingData, token) => {
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bookingData)
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error saat membuat pemesanan');
  }
};

export const getUserBookings = async (token) => {
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error saat mengambil data pemesanan');
  }
};

export const updatePaymentStatus = async (bookingId, status, token) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${bookingId}/payment`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    return await response.json();
  } catch (error) {
    throw new Error('Error saat update status pembayaran');
  }
};