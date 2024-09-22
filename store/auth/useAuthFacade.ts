// store/auth/useAuthFacade.ts

import { shallow } from "zustand/shallow"
import useAuthStore from "./useAuthStore"

export const useAuthFacade = () => {
    const {
        user,
        loading,
        error,
        success,
        login,
        logout,
        register,
        resetStore,
        accessToken
    } = useAuthStore(
        (state) => ({
            user: state.user,
            loading: state.loading,
            error: state.error,
            login: state.login,
            register: state.register,
            success: state.success,
            resetStore: state.resetStore,
            accessToken: state.accessToken,
            logout: state.logout
        }),
        shallow
    )

    return {
        user,
        loading,
        error,
        success,
        login,
        register,
        resetStore,
        accessToken,
        logout
    }
}

export const useAuthStoreAxiosState = () => {
    const { accessToken, user, logout } = useAuthStore.getState();

    return { accessToken, user, logout };
}
