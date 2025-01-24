// Base URL untuk API
export const BASE_URL = 'http://192.168.1.5:5000'; // Sesuaikan dengan IP dan port backend Anda

// Endpoint-endpoint API
export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
    },
    
    // User endpoints
    USER: {
        PROFILE: '/user/profile',
        UPDATE_PROFILE: '/user/update',
        CHANGE_PASSWORD: '/user/change-password',
    },
    
    // Movie endpoints
    MOVIE: {
        LIST: '/movies',
        DETAIL: (id) => `/movies/${id}`,
        CREATE: '/movies/create',
        UPDATE: (id) => `/movies/${id}/update`,
        DELETE: (id) => `/movies/${id}/delete`,
    },
    
    // Review endpoints
    REVIEW: {
        LIST: '/reviews',
        CREATE: '/reviews/create',
        UPDATE: (id) => `/reviews/${id}/update`,
        DELETE: (id) => `/reviews/${id}/delete`,
    },
    
    // Watchlist endpoints
    WATCHLIST: {
        LIST: '/watchlist',
        ADD: '/watchlist/add',
        REMOVE: (id) => `/watchlist/${id}/remove`,
    },
};

// Axios instance dengan konfigurasi default
import axios from 'axios';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor untuk menambahkan token ke header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk handling response
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            // Redirect to login if needed
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
); 