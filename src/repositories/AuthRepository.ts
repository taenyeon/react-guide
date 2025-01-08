import { Token } from '@typings/Token'
import tokenRepository from '@repositories/TokenRepository'
import api from '@utils/api/api'
import UserInfo from '@typings/UserInfo'
import { ApiResponse } from '@utils/api/models/ApiResponse'
import ApiError from '@utils/error/ApiError'

type AuthRepository = {
  login: (username: string, password: string) => Promise<Token>
  logout: () => Promise<void>
  isAuthorized: () => Promise<boolean>
  getUserInfo: () => Promise<UserInfo>
}

const authRepository: AuthRepository = {
  login: async (username: string, password: string) => {
    const apiResponse: ApiResponse<Token> = new ApiResponse<Token>().parseData(
      await api().post('login', {
        username: username,
        password: password
      })
    )

    if (apiResponse.isFailure) throw new ApiError(apiResponse.code)

    tokenRepository.setToken(apiResponse.body!)

    return apiResponse.body!
  },

  logout: async () => {
    await api().get('logout')

    tokenRepository.dropToken()
  },

  isAuthorized: async () => {
    return tokenRepository.getToken() != null
  },

  getUserInfo: async () => {
    const apiResponse = new ApiResponse<UserInfo>().parseData(await api().get('user'))

    if (apiResponse.isFailure) throw new ApiError(apiResponse.code)

    return apiResponse.body!
  }
}

export default authRepository
