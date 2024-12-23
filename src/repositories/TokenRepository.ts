import {Token} from "../types/Token.ts";
import secureStorage from "../utils/storage/secureStorage.ts";

type TokenRepository = {
    getAccessToken: () => string | null;
    getRefreshToken: () => string | null;
    setAccessToken: (accessToken: string | null) => void;
    setRefreshToken: (refreshToken: string | null) => void;
    setToken: (token: Token) => void;
    getToken: () => Token | null;
    dropToken: () => void
};
const accessTokenKey = "ACCESS_TOKEN";
const refreshTokenKey = "REFRESH_TOKEN";

const tokenRepository: TokenRepository = {

    getAccessToken: () => secureStorage.get(accessTokenKey) as string,

    getRefreshToken: () => secureStorage.get(refreshTokenKey) as string,

    setAccessToken: (accessToken: string | null) => secureStorage.set(accessTokenKey, accessToken),

    setRefreshToken: (refreshToken: string | null) => secureStorage.set(refreshTokenKey, refreshToken),

    setToken: (token: Token) => {
        tokenRepository.setAccessToken(token.accessToken);
        tokenRepository.setRefreshToken(token.refreshToken);
    },

    getToken: () => {
        const accessToken = tokenRepository.getAccessToken();
        const refreshToken = tokenRepository.getRefreshToken();
        if (!accessToken || !refreshToken) return null;
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    },

    dropToken: () => {
        secureStorage.drop(accessTokenKey);
        secureStorage.drop(refreshTokenKey);
    },
};

export default tokenRepository;