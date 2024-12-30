import {Token} from "../types/Token.ts";
import Authorization from "../types/Authorization.ts";
import tokenRepository from "./TokenRepository.ts";
import api from "../utils/api/api.ts";
import UserInfo from "../types/UserInfo.ts";
import {ApiResponse} from "../utils/api/models/ApiResponse.ts";
import ApiError from "../utils/error/ApiError.ts";

type AuthRepository = {
    login: (username: string, password: string) => Promise<Token>;
    logout: () => Promise<void>;
    getAuthorization: () => Promise<Authorization>
    getUserInfo: () => Promise<UserInfo>;
}

const authRepository: AuthRepository = {

    login: async (username: string, password: string) => {
        const apiResponse: ApiResponse<Token> = new ApiResponse<Token>().parseData(
            await api().post("login", {
                username: username,
                password: password,
            }))

        if (apiResponse.isFailure) throw new ApiError(apiResponse.code)

        tokenRepository.setToken(apiResponse.body!)

        return apiResponse.body!
    },

    logout: async () => {
        await api().get("logout")

        tokenRepository.dropToken()
    },

    getAuthorization: async () => {
        const token = tokenRepository.getToken()

        if (!token) return {isAuthorized: false, userInfo: null}

        return {
            isAuthorized: true,
            userInfo: null,
        }
    },

    getUserInfo: async () => {
        const apiResponse = new ApiResponse<UserInfo>().parseData(
            await api().get('user')
        )

        if (apiResponse.isFailure) throw new ApiError(apiResponse.code)

        return apiResponse.body!
    },
}

export default authRepository