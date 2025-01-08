import * as React from 'react'
import { useEffect } from 'react'
import Login from '@pages/auth/components/login/Login'
import Authorized from '@pages/auth/components/authorized/Authorized'
import { Box } from '@mui/material'
import useAuthViewModel from '@pages/auth/useAuthViewModel'

const AuthPage: React.FC = () => {
  const { authorization, isLoading, init } = useAuthViewModel()

  useEffect(() => {
    init()
  }, [])

  if (isLoading) return <h1>loading...</h1>

  return (
    <>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          bgcolor: 'text.disabled',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {authorization?.isAuthorized ? <Authorized /> : <Login />}
      </Box>
    </>
  )
}

export default AuthPage
