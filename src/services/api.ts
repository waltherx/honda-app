import { getAccessToken } from '@/libs/localStorage';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL
const api = axios.create({
    baseURL: BASE_URL,
});

//api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//api.defaults.headers.common['Content-Type'] = 'application/json';

api.interceptors.request.use(async (config) => {
    const newConfig = { Headers: config.headers || {}, ...config };

    const jwt = getAccessToken();
    if (jwt) {
        newConfig.headers.Authorization = `Bearer ${jwt}`;
        newConfig.headers['Content-Type'] = 'application/json';
    }
    console.log(newConfig);
    return newConfig;
});

export default api;