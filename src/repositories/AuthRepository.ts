import {Token} from "../types/Token.ts";
import tokenRepository from "./TokenRepository.ts";
import api from "../utils/api/api.ts";
import UserInfo from "../types/UserInfo.ts";
import {ApiResponse} from "../utils/api/models/ApiResponse.ts";
import ApiError from "../utils/error/ApiError.ts";

type AuthRepository = {
    login: (username: string, password: string) => Promise<Token>;
    logout: () => Promise<void>;
    isAuthorized: () => Promise<boolean>
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

    isAuthorized: async () => {
        return tokenRepository.getToken() != null
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