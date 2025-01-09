import useAuthStore from '@stores/useAuthStore'
import authRepository from '@repositories/AuthRepository'
import { useNavigate } from 'react-router-dom'

const useUserInfoViewModel = () => {
  const { authorization, setAuthorization, reset } = useAuthStore()
  const navigate = useNavigate()

  const init = async () => {
    if (!(await authRepository.isAuthorized())) return
    setAuthorization({ isAuthorized: true, userInfo: await authRepository.getUserInfo() })
  }

  const logout = async () => {
    await authRepository.logout()
    reset()
  }

  const routeLoginPage = () => navigate('/auth')

  return {
    authorization,
    init,
    logout,
    routeLoginPage,
  }
}

export default useUserInfoViewModel
