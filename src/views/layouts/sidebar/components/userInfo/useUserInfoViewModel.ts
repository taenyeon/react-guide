import useAuthStore from '@stores/useAuthStore'
import authRepository from '@repositories/AuthRepository'

const useUserInfoViewModel = () => {
  const { authorization, setAuthorization, reset } = useAuthStore()

  const init = async () => {
    if (!(await authRepository.isAuthorized())) return
    setAuthorization({ isAuthorized: true, userInfo: await authRepository.getUserInfo() })
  }

  const logout = async () => {
    await authRepository.logout()
    reset()
  }

  return {
    authorization,
    init,
    logout,
  }
}

export default useUserInfoViewModel
