import * as React from "react";
import authViewModel from "../viewModel/AuthViewModel.ts";
import {useEffect} from "react";
import {isLoading} from "../constant/ViewModelStatus.ts";
import Login from "../components/auth/Login.tsx";
import Authorized from "../components/auth/Authorized.tsx";
import {Box} from "@mui/material";

const AuthPage: React.FC = () => {
    const {authorization, status, error, init} = authViewModel();

    useEffect(() => {
        init()
    }, [init])

    if (isLoading(status)) return <h1>loading...</h1>;

    return (
        <>
            <Box sx={{
                width: "100vw",
                height: "100vh",
                bgcolor: "text.disabled",
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {authorization.isAuthorized ? <Authorized/> : <Login/>}
            </Box>
        </>
    );
}

export default AuthPage;
