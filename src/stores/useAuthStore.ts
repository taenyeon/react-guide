import Authorization from '@typings/Authorization'
import ApiError from '@utils/error/ApiError'
import { create } from 'zustand/react'

interface AuthStore {
  authorization: Authorization | null
  isLoading: boolean
  error: ApiError | Error | null

  setAuthorization: (authorization: Authorization | null) => void
  setLoading: (status: boolean) => void
  setError: (error: ApiError | Error | null) => void
  reset: () => void
}

const useAuthStore = create<AuthStore>(set => ({
  authorization: { isAuthorized: false, userInfo: null },
  isLoading: false,
  error: null,

  setAuthorization: authorization => set({ authorization }),
  setLoading: isLoading => set({ isLoading }),
  setError: error => set({ error }),
  reset: () =>
    set({ authorization: { isAuthorized: false, userInfo: null }, isLoading: false, error: null }),
}))

export default useAuthStore
