import React from "react";
import authViewModel from "../../viewModel/AuthViewModel.ts";
import {Button, Typography} from "@mui/material";
import CardForm from "../layouts/CardForm.ts";


const Authorized: React.FC = () => {
    const {authorization,logout} = authViewModel();

    const handleLogout = async () => {
        await logout();
    }

    return <div>
        <CardForm variant={"outlined"}>
            <Typography component={"h1"} variant={"h4"}>
                Authorized
            </Typography>

            <Typography component={"h1"} variant={"h6"}>
                username: {authorization.userInfo?.username}
            </Typography>
            <Typography component={"h1"} variant={"h6"}>
                name: {authorization.userInfo?.name}
            </Typography>

            <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </CardForm>
    </div>
}

export default Authorized