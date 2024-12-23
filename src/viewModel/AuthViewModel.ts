import Authorization from "../types/Authorization.ts";
import {create} from "zustand/react";
import authRepository from "../repositories/AuthRepository.ts";
import {Token} from "../types/Token.ts";

type AuthViewModel = {
    authorization: Authorization;
    isLoading: boolean;

    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    init: () => Promise<void>;
}

const useAuthViewModel = create<AuthViewModel>(
    (set) => ({
        authorization: {
            isAuthorized: false,
            userInfo: null,
        },
        isLoading: true,

        login: async (username, password) => {
            set({isLoading: true})

            const token: Token = await authRepository.login(username, password);

            if (token.accessToken && token.refreshToken) {
                set({
                    isLoading: false,
                    authorization: {isAuthorized: true, userInfo: null},
                })
            } else {
                set({
                    isLoading: false,
                    authorization: {isAuthorized: false, userInfo: null}
                })
            }

        },

        logout: async () => {
            await authRepository.logout();

            set({
                isLoading: false,
                authorization: {
                    isAuthorized: false,
                    userInfo: null
                },
            })
        },

        init: async () => {
            set({isLoading: false, authorization: await authRepository.getAuthorization()})
        }
    })
)

export default useAuthViewModel;