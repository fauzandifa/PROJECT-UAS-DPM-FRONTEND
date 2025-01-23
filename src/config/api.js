import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ganti IP sesuai dengan IP komputer Anda
const BASE_URL = 'http://192.168.212.37:5000/api';  // Pastikan IP dan port benar

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Debug interceptor
axiosInstance.interceptors.request.use(request => {
    console.log('Starting Request:', {
        url: request.url,
        method: request.method,
        data: request.data,
        headers: request.headers
    });
    return request;
});

axiosInstance.interceptors.response.use(
    response => {
        console.log('Response:', response.data);
        return response;
    },
    error => {
        console.error('API Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            url: error.config?.url
        });
        return Promise.reject(error);
    }
);

// Interceptor untuk menambahkan token
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error getting token:', error);
        }
        console.log('Starting Request:', {
            url: config.url,
            method: config.method,
            data: config.data
        });
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const API_ENDPOINTS = {
    register: '/auth/register',
    login: '/auth/login',
    profile: '/users/profile',
    users: '/users',
    bookings: '/booking',
    allBookings: '/booking/all',
    verifyPassword: '/auth/verify-password',
};

export default axiosInstance;