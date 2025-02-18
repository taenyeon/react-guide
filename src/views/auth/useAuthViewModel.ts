import authRepository from '@repositories/AuthRepository'
import useAuthStore from '@stores/useAuthStore'
import { useShallow } from 'zustand/react/shallow'

const useAuthViewModel = () => {
  const { authorization, isLoading, setAuthorization } = useAuthStore(
    useShallow(state => ({
      authorization: state.authorization,
      isLoading: state.isLoading,
      setAuthorization: state.setAuthorization,
    })),
  )

  const init = async () => {
    if (!(await authRepository.isAuthorized())) return
    setAuthorization({ isAuthorized: true, userInfo: await authRepository.getUserInfo() })
  }

  return {
    authorization,
    isLoading,
    init,
  }
}

export default useAuthViewModel
