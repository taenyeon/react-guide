import Authorization from "../types/Authorization.ts";
import {create} from "zustand/react";
import authRepository from "../repositories/AuthRepository.ts";
import {Token} from "../types/Token.ts";
import {viewModelStatus, ViewModelStatus} from "../constant/ViewModelStatus.ts";
import {parseError} from "../utils/error/ErrorParser.ts";
import ApiError from "../utils/error/ApiError.ts";

export type AuthViewModel = {
    authorization: Authorization;
    status: ViewModelStatus;
    error: ApiError | Error | null;

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
        status: viewModelStatus.loading,
        error: null,

        login: async (username, password) => {
            set({status: viewModelStatus.loading})

            try {
                const token: Token = await authRepository.login(username, password);
                if (token.accessToken && token.refreshToken) {
                    set({
                        status: viewModelStatus.done,
                        authorization: {isAuthorized: true, userInfo: null},
                    })
                }
            } catch (e) {
                console.log(e)
                const error = parseError(e);
                set({
                    status: viewModelStatus.error,
                    error: error,
                    authorization: {isAuthorized: false, userInfo: null}
                })
            }

        },

        logout: async () => {
            await authRepository.logout();

            set({
                status: viewModelStatus.done,
                authorization: {
                    isAuthorized: false,
                    userInfo: null
                },
            })
        },

        init: async () => {
            set({status: viewModelStatus.done, authorization: await authRepository.getAuthorization()})
        }
    })
)

export default useAuthViewModel;