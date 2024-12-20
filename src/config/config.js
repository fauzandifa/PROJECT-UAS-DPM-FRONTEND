const DEV_API_URL = 'http://10.0.2.2:5000/api'; // untuk Android emulator
const PROD_API_URL = 'https://your-production-url.com/api';

export const API_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;