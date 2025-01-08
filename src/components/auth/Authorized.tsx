import React from 'react'
import { Button, Typography } from '@mui/material'
import CardForm from '@components/layouts/CardForm'
import useAuthViewModel from '@viewModels/useAuthViewModel'

const Authorized: React.FC = () => {
  const { authorization, logout } = useAuthViewModel()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div>
      <CardForm variant={'outlined'}>
        <Typography component={'h1'} variant={'h4'}>
          Authorized
        </Typography>

        <Typography component={'h1'} variant={'h6'}>
          username: {authorization?.userInfo?.username}
        </Typography>
        <Typography component={'h1'} variant={'h6'}>
          name: {authorization?.userInfo?.name}
        </Typography>

        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </CardForm>
    </div>
  )
}

export default Authorized
