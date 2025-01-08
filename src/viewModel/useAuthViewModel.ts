import useAuthStore from '../store/AuthStore.ts'
import authRepository from '../repositories/AuthRepository.ts'
import { Token } from '../types/Token.ts'
import ApiError from '../utils/error/ApiError.ts'
import { apiCode } from '../utils/error/constant/ApiCode.ts'
import snackbarStore from '../store/SnackbarStore.ts'

const useAuthViewModel = () => {
  const { authorization, isLoading, error, reset, setAuthorization, setLoading, setError } = useAuthStore()

  const login = async (username: string, password: string) => {
    setLoading(true)
    try {
      const token: Token = await authRepository.login(username, password)

      if (token.accessToken && token.refreshToken) {
        setAuthorization({ isAuthorized: true, userInfo: await authRepository.getUserInfo() })
      }
    } catch (e) {
      if (!(e instanceof Error) || !(e instanceof ApiError)) return // todo 정의 필요

      let error = e

      if (e.name == apiCode.AUTH_ERROR) error = new ApiError(apiCode.LOGIN_FAILURE)
      setError(error)

      await snackbarStore.getState().add(error) // 분리 필요?
    }
    setLoading(false)
  }

  const logout = async () => {
    await authRepository.logout()
    reset()
  }

  const init = async () => {
    if (!(await authRepository.isAuthorized())) return
    setAuthorization({ isAuthorized: true, userInfo: await authRepository.getUserInfo() })
  }

  return {
    authorization,
    isLoading,
    error,
    login,
    logout,
    init
  }
}

export default useAuthViewModel
