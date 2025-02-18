import axios, { AxiosInstance } from 'axios'
import tokenRepository from '@repositories/TokenRepository'
import ApiError from '@utils/error/ApiError'
import { apiCode } from '@utils/error/constant/ApiCode'

export const api: () => AxiosInstance = () => {
  const { getAccessToken } = tokenRepository

  const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
    timeout: 5000,
  })

  instance.interceptors.request.use(
    config => {
      const accessToken = getAccessToken()

      if (accessToken != null) config.headers['authorization'] = `Bearer ${accessToken}`

      console.debug(
        `\n[\x1B[34mREQUEST\x1B[0m]\n\n` +
          `url : ${config.baseURL}/${config.url}\n` +
          `method : ${config.method}\n\n` +
          `headers : ${JSON.stringify(config.headers, null, 2)}\n` +
          `body : ${JSON.stringify(config.data, null, 2)}\n` +
          `queryParams : ${config.params}\n\n`,
      )

      return config
    },

    error => {
      return Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    response => {
      console.debug(
        `\n[\x1B[31mRESPONSE\x1B[0m]\n\n` +
          `url : ${response.config.baseURL}/${response.config.url}\n` +
          `method : ${response.config.method}\n\n` +
          `headers :${JSON.stringify(response.headers, null, 2)}\n` +
          `body : ${JSON.stringify(response.data, null, 2)}\n\n`,
      )
      
      return response
    },
    error => {
      if (!axios.isAxiosError(error)) return Promise.reject(error)

      switch (error.response?.status) {
        case 401:
          return Promise.reject(new ApiError(apiCode.AUTH_ERROR, error))
        default:
          return Promise.reject(new ApiError(apiCode.UNKNOWN_ERROR, error))
      }
    },
  )
  return instance
}

export default api
