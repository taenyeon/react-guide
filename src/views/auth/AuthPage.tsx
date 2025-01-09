import * as React from 'react'
import Login from '../auth/components/login/Login'
import Authorized from '../auth/components/authorized/Authorized'
import useAuthViewModel from '../auth/useAuthViewModel'
import './authPage.scss'

const AuthPage: React.FC = () => {
  const { authorization, isLoading } = useAuthViewModel()

  if (isLoading) return <h1>loading...</h1>

  return (
    <>
      <div className="auth-page">{authorization?.isAuthorized ? <Authorized /> : <Login />}</div>
    </>
  )
}

export default AuthPage
