import React from 'react'
import { Box, Button, FormControl, FormLabel, TextField, Typography } from '@mui/material'
import CardForm from '@components/layouts/CardForm'
import useLoginViewModel from '@pages/auth/components/login/useLoginViewModel'

const Login: React.FC = () => {
  const { username, password, login, inputUsername, inputPassword } = useLoginViewModel()

  return (
    <CardForm>
      <Typography component={'h1'} variant={'h4'}>
        Login
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
        <FormControl>
          <FormLabel htmlFor="username" sx={{ textAlign: 'left' }}>
            Username
          </FormLabel>
          <TextField
            error={username.error != ''}
            helperText={username.error}
            id="username"
            type="text"
            placeholder="username"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={username.error ? 'error' : 'primary'}
            value={username.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              inputUsername(event.target.value)
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password" sx={{ textAlign: 'left' }}>
            Password
          </FormLabel>
          <TextField
            error={password.error != ''}
            helperText={password.error}
            id="password"
            type="password"
            name="password"
            placeholder="password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={password.error ? 'error' : 'primary'}
            value={password.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              inputPassword(event.target.value)
            }
          />
        </FormControl>
        <Button type="button" fullWidth variant="contained" onClick={login}>
          log in
        </Button>
      </Box>
    </CardForm>
  )
}

export default Login
