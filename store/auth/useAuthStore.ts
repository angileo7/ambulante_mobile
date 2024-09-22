// store/auth/useAuthStore.ts

import { createWithEqualityFn } from 'zustand/traditional'
import { InitialStateProps } from './interfaces';
import * as Keychain from 'react-native-keychain';
import AxiosConfig from '@app/utils/axiosConfig';

const initialState = {
    user: null,
    loading: false,
    error: null,
    success: false,
    accessToken: null
}

const useAuthStore = createWithEqualityFn<InitialStateProps>()((set) => {
    const getAccessToken = async () => {
        const credentials = await Keychain.getInternetCredentials('accessToken');

        if (credentials) {
            return credentials;
        } else {
            return null;
        }
    }

    const getUser = async () => {
        const user = await Keychain.getInternetCredentials('user');

        if (user) {
            return user;
        } else {
            return null;
        }
    }

    getAccessToken().then((initialAccessToken) => {
        set((state) => ({ ...state, accessToken: initialAccessToken }));
    });

    getUser().then((userData) => {
        set((state) => ({ ...state, user: userData }));
    });

    return {
        ...initialState,

        resetStore: () => {
            set((state) => ({ ...state, loading: false, success: false, error: null }));
        },

        login: async ({ phone, password }) => {
            set((state) => ({ ...state, loading: true }));

            AxiosConfig.get('/login', {
                headers: { phone_number: phone, pw: password }
            })
                .then(async (loginResponse) => {
                    const userData = loginResponse.data;

                    await Keychain.setInternetCredentials(
                        'user', 'user', JSON.stringify(userData.user)
                    );
                    await Keychain.setInternetCredentials(
                        'accessToken', 'accessToken', userData.access_token
                    );

                    set((state) => ({
                        ...state,
                        error: null,
                        success: true,
                        user: userData.user,
                        accessToken: userData.access_token
                    }));
                })
                .catch((errorResponse) => {
                    set((state) => ({
                        ...state,
                        success: false,
                        error: errorResponse?.response?.data?.message || errorResponse.message
                    }));
                })
                .finally(() => {
                    set((state) => ({ ...state, loading: false }));
                });
        },

        register: async ({
            firstName, lastName, phone, password
        }) => {
            set((state) => ({ ...state, loading: true }));

            AxiosConfig.post('/signup', {
                first_name: firstName,
                last_name: lastName,
                phone_number: phone,
                password: password
            })
                .then(() => {
                    set((state) => ({ ...state, error: null, success: true }));
                })
                .catch((errorResponse) => {
                    set((state) => ({
                        ...state,
                        success: false,
                        error: errorResponse.response?.data?.message || errorResponse.message
                    }));
                })
                .finally(() => {
                    set((state) => ({ ...state, loading: false }));
                });
        },

        logout: async () => {
            await Keychain.resetInternetCredentials('user');
            await Keychain.resetInternetCredentials('accessToken');

            set(initialState);
        }
    }
});

export default useAuthStore;
