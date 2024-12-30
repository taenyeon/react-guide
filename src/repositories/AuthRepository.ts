import {Token} from "../types/Token.ts";
import Authorization from "../types/Authorization.ts";
import tokenRepository from "./TokenRepository.ts";
import api from "../utils/api/api.ts";
import UserInfo from "../types/UserInfo.ts";

type AuthRepository = {
    login: (username: string, password: string) => Promise<Token>;
    logout: () => Promise<void>;
    getAuthorization: () => Promise<Authorization>
    getUserInfo: () => Promise<UserInfo>;
}

const authRepository: AuthRepository = {

    login: async (username: string, password: string) => {

        const response = await api().post("login",
            {
                username: username,
                password: password,
            });

        const token: Token = response.data;

        tokenRepository.setToken(token);
        return token;
    },

    logout: async () => {
        await api().get("logout");

        tokenRepository.dropToken();
    },

    getAuthorization: async () => {
        const token = tokenRepository.getToken();
        if (!token) return {isAuthorized: false, userInfo: null};

        return {
            isAuthorized: true,
            userInfo: null,
        };
    },

    getUserInfo: async () => {
        const response = await api().get('user');
        return response.data as UserInfo;
    },
}

export default authRepository