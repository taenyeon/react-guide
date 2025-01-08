import authRepository from '@repositories/AuthRepository'
import useAuthStore from '@stores/useAuthStore'

const useAuthViewModel = () => {
  const { authorization, isLoading, error, setAuthorization } = useAuthStore()

  const init = async () => {
    if (!(await authRepository.isAuthorized())) return
    setAuthorization({ isAuthorized: true, userInfo: await authRepository.getUserInfo() })
  }

  return {
    authorization,
    isLoading,
    error,
    init,
  }
}

export default useAuthViewModel
