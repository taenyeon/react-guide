import authRepository from '@repositories/AuthRepository'
import useAuthStore from '@stores/useAuthStore'
import { useShallow } from 'zustand/react/shallow'

const useAuthorizedViewModel = () => {
  const { authorization, reset } = useAuthStore(
    useShallow(state => ({
      authorization: state.authorization,
      reset: state.reset,
    })),
  )

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
