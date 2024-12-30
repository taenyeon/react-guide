import {Token} from "../types/Token.ts";
import secureStorage from "../utils/storage/secureStorage.ts";

type TokenRepository = {
    getAccessToken: () => string | null
    getRefreshToken: () => string | null
    setAccessToken: (accessToken: string | null) => void
    setRefreshToken: (refreshToken: string | null) => void
    setToken: (token: Token) => void
    getToken: () => Token | null
    dropToken: () => void
};
const _accessTokenKey = "ACCESS_TOKEN"
const _refreshTokenKey = "REFRESH_TOKEN"

const tokenRepository: TokenRepository = {

    getAccessToken: () => secureStorage.get(_accessTokenKey) as string,

    getRefreshToken: () => secureStorage.get(_refreshTokenKey) as string,

    setAccessToken: (accessToken: string | null) => secureStorage.set(_accessTokenKey, accessToken),

    setRefreshToken: (refreshToken: string | null) => secureStorage.set(_refreshTokenKey, refreshToken),

    setToken: (token: Token) => {
        tokenRepository.setAccessToken(token.accessToken)
        tokenRepository.setRefreshToken(token.refreshToken)
    },

    getToken: () => {
        const accessToken = tokenRepository.getAccessToken()
        const refreshToken = tokenRepository.getRefreshToken()
        if (!accessToken || !refreshToken) return null
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    },

    dropToken: () => {
        secureStorage.drop(_accessTokenKey)
        secureStorage.drop(_refreshTokenKey)
    },
};

export default tokenRepository