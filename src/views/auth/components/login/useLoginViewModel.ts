import { Token } from '@typings/Token'
import authRepository from '@repositories/AuthRepository'
import ApiError from '@utils/error/ApiError'
import { apiCode } from '@utils/error/constant/ApiCode'
import useSnackbarStore from '@stores/useSnackbarStore'
import useAuthStore from '@stores/useAuthStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'

const useLoginViewModel = () => {
  const navigate = useNavigate()

  const { setLoading, setAuthorization, setError } = useAuthStore(
    useShallow(state => ({
      setLoading: state.setLoading,
      setAuthorization: state.setAuthorization,
      setError: state.setError,
    })),
  )

  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const inputUsername = (state: string) =>
    setUsername(prevState => ({ ...prevState, value: state }))

  const inputPassword = (state: string) =>
    setPassword(prevState => ({ ...prevState, value: state }))

  const login = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      const token: Token = await authRepository.login(username.value, password.value)

      if (token.accessToken && token.refreshToken) {
        setAuthorization({ isAuthorized: true, userInfo: await authRepository.getUserInfo() })
        navigate('/', { replace: true })
      }
    } catch (e) {
      handleLoginError(e)
    } finally {
      setLoading(false)
    }
  }

  const validate = () => {
    let isValid = true
    if (!username.value) {
      setUsername(prevState => ({ ...prevState, error: 'enter username' }))
      isValid = false
    } else {
      setUsername(prevState => ({ ...prevState, error: '' }))
    }
    if (!password.value) {
      setPassword(prevState => ({ ...prevState, error: 'enter password' }))
      isValid = false
    } else {
      setPassword(prevState => ({ ...prevState, error: '' }))
    }
    return isValid
  }

  const handleLoginError = async (e: unknown) => {
    if (!(e instanceof Error) || !(e instanceof ApiError)) return

    let error = e

    if (e.name == apiCode.AUTH_ERROR) error = new ApiError(apiCode.LOGIN_FAILURE)
    setError(error)

    await useSnackbarStore.getState().add(error)
  }

  return { username, password, login, inputPassword, inputUsername }
}

export default useLoginViewModel
