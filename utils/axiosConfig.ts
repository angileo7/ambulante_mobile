/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStoreAxiosState } from '../store/auth/useAuthFacade';
import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://ambulante-be.onrender.com/',
    // baseURL: 'http://localhost:3500/',
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    withCredentials: true
});

instance.interceptors.request.use(
    (config) => {
        if (config) {
            const { accessToken } = useAuthStoreAxiosState();

            if (accessToken) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
                config.headers["Content-Type"] = "application/json";
            }

            return config;
        }

    },
    (err) => Promise.reject(err)
);

instance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    if (error?.response !== null) {
        if (error.response.status === 403) {
            useAuthStoreAxiosState().logout();
        }
    }

    return Promise.reject(error);
});

export default instance;
