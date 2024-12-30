import Authorization from "../types/Authorization.ts";
import {create} from "zustand/react";
import authRepository from "../repositories/AuthRepository.ts";
import {Token} from "../types/Token.ts";
import {viewModelStatus, ViewModelStatus} from "../constant/ViewModelStatus.ts";
import ApiError from "../utils/error/ApiError.ts";
import snackbarViewModel from "./SnackbarViewModel.ts";
import {apiCode} from "../utils/error/constant/ApiCode.ts";

export type AuthViewModel = {
    authorization: Authorization;
    status: ViewModelStatus;
    error: ApiError | Error | null;

    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    init: () => Promise<void>;
}

const authViewModel = create<AuthViewModel>(
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
                    const userInfo = await authRepository.getUserInfo();
                    set({
                        status: viewModelStatus.done,
                        authorization: {isAuthorized: true, userInfo: userInfo},
                    })
                }
            } catch (e) {
                if (e instanceof Error) {
                    let error = e;
                    if (e.name == apiCode.AUTH_ERROR) {
                        error = new ApiError(apiCode.LOGIN_FAILURE)
                    }
                    set({
                        status: viewModelStatus.error,
                        error: error,
                        authorization: {isAuthorized: false, userInfo: null}
                    })
                    await snackbarViewModel.getState().add(error);
                }
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
            const authorization: Authorization = await authRepository.getAuthorization();
            set({
                status: viewModelStatus.done,
                authorization: {
                    ...authorization,
                    userInfo: authorization.isAuthorized ? await authRepository.getUserInfo() : null
                }
            })
        }
    })
)

export default authViewModel;