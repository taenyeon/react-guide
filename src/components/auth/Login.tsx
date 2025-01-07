import React, {useState} from "react";
import {Box, Button, FormControl, FormLabel, TextField, Typography} from "@mui/material";
import CardForm from "../layouts/CardForm.ts";
import useAuthViewModel from "../../viewModel/useAuthViewModel.ts";

const Login: React.FC = () => {
    const {login} =useAuthViewModel();

    const [username, setUsername] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validate()) return;
        await login(username.value, password.value)
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(
        (prevState) => {
            return {...prevState, value: event.target.value}
        });

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(
        (prevState) => {
            return {...prevState, value: event.target.value}
        });

    const validate = () => {
        let isValid = true;
        if (!username.value) {
            setUsername((prevState) => {
                return {...prevState, ERROR: 'enter username'}
            });
            isValid = false;
        }
        if (!password.value) {
            setPassword((prevState) => {
                return {...prevState, ERROR: 'enter password'}
            })
            isValid = false;
        }
        return isValid
    }

    return <CardForm>
        <Typography
            component={"h1"}
            variant={"h4"}
        >
            Login
        </Typography>
        <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{display: 'flex', flexDirection: 'column', width: '100%', gap: 2}}
        >
            <FormControl>
                <FormLabel htmlFor="username" sx={{textAlign: 'left'}}>Username</FormLabel>
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUsernameChange(event)}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="password" sx={{textAlign: 'left'}}>Password</FormLabel>
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePasswordChange(event)}
                />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
                log in
            </Button>
        </Box>
    </CardForm>
}

export default Login