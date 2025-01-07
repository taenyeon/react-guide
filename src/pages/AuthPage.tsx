import * as React from "react";
import {useEffect} from "react";
import Login from "../components/auth/Login.tsx";
import Authorized from "../components/auth/Authorized.tsx";
import {Box} from "@mui/material";
import useAuthViewModel from "../viewModel/useAuthViewModel.ts";

const AuthPage: React.FC = () => {
    // const {authorization, status, init} = authViewModel()
    const {authorization, isLoading, init} = useAuthViewModel()

    useEffect(() => {
        init()
    }, [])

    if (isLoading) return <h1>loading...</h1>

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
                {authorization?.isAuthorized ? <Authorized/> : <Login/>}
            </Box>
        </>
    )
}

export default AuthPage;
