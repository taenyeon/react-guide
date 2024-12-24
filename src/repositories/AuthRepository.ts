import {Token} from "../types/Token.ts";
import Authorization from "../types/Authorization.ts";
import tokenRepository from "./TokenRepository.ts";
import api from "../utils/api/api.ts";

type AuthRepository = {
    login: (username: string, password: string) => Promise<Token>;
    logout: () => Promise<void>;
    getAuthorization: () => Promise<Authorization>
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
        // const token = null;
        if (!token) return {isAuthorized: false, userInfo: null};
        return {
            isAuthorized: true,
            userInfo: null
        };
    }
}

export default authRepository