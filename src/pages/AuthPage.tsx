import * as React from "react";
import useAuthViewModel from "../viewModel/AuthViewModel.ts";
import {useEffect} from "react";
import {viewModelStatus} from "../constant/ViewModelStatus.ts";
import Login from "../components/auth/Login.tsx";
import Authorized from "../components/auth/Authorized.tsx";
import ApiError from "../utils/error/ApiError.ts";
import {Box} from "@mui/material";

const AuthPage: React.FC = () => {
    const {authorization, status, error, init} = useAuthViewModel();

    useEffect(() => {
        init().then()
    }, [])

    return (
        <Box sx={{width:"100vw", height:"100vh", bgcolor:"text.disabled" , display:"flex", justifyContent: 'center', alignItems: 'center'}}>
            {{
                [viewModelStatus.done]: (authorization.isAuthorized && <Authorized/>),
                [viewModelStatus.loading]: <h1>loading...</h1>,
                [viewModelStatus.error]: <div>
                    <p>code : {error?.name}</p>
                    {(error instanceof ApiError) && <p>error : {error.originalError?.message}</p>}
                    <Login/>
                </div>,
            }[status] || <Login/>}
        </Box>
    );
}

export default AuthPage;