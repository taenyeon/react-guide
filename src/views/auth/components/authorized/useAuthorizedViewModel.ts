import authRepository from '@repositories/AuthRepository'
import useAuthStore from '@stores/useAuthStore'

const useAuthorizedViewModel = () => {
  const { authorization, reset } = useAuthStore()

  const logout = async () => {
    await authRepository.logout()
    reset()
  }

  return {
    authorization,
    logout,
  }
}

export default useAuthorizedViewModel
