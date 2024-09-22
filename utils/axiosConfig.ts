/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStoreAxiosState } from '@app/store/auth/useAuthFacade';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true
});

instance.interceptors.request.use(
    (config) => {
        if (config) {
            const { accessToken, user } = useAuthStoreAxiosState();

            if (accessToken && user) {
                const userID = JSON.parse((user as any).password).id;

                config.headers["Authorization"] = `Bearer ${accessToken.password}`;
                config.headers["Content-Type"] = "application/json";
                config.headers["user_id"] = userID || null;
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
