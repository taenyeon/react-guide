import React from 'react'
import { Button, Typography } from '@mui/material'
import CardForm from '@components/CardForm'
import useAuthorizedViewModel from '../../../auth/components/authorized/useAuthorizedViewModel'

const Authorized: React.FC = () => {
  const { authorization, logout } = useAuthorizedViewModel()

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

        <Button variant="contained" onClick={logout}>
          Logout
        </Button>
      </CardForm>
    </div>
  )
}

export default Authorized
