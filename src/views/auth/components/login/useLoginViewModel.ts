import { Token } from '@typings/Token'
import authRepository from '@repositories/AuthRepository'
import ApiError from '@utils/error/ApiError'
import { apiCode } from '@utils/error/constant/ApiCode'
import snackbarStore from '@stores/SnackbarStore'
import useAuthStore from '@stores/useAuthStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useLoginViewModel = () => {
  const { setLoading, setAuthorization, setError } = useAuthStore()
  const navigate = useNavigate()

  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const inputUsername = (state: string) =>
    setUsername(prevState => {
      return { ...prevState, value: state }
    })

  const inputPassword = (state: string) =>
    setPassword(prevState => {
      return { ...prevState, value: state }
    })

  const login = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      const token: Token = await authRepository.login(username.value, password.value)

      if (token.accessToken && token.refreshToken) {
        setAuthorization({ isAuthorized: true, userInfo: await authRepository.getUserInfo() })
        navigate('/')
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

  const validate = () => {
    let isValid = true
    if (!username.value) {
      setUsername(prevState => {
        return { ...prevState, ERROR: 'enter username' }
      })
      isValid = false
    }
    if (!password.value) {
      setPassword(prevState => {
        return { ...prevState, ERROR: 'enter password' }
      })
      isValid = false
    }
    return isValid
  }

  return { username, password, login, inputPassword, inputUsername }
}

export default useLoginViewModel
