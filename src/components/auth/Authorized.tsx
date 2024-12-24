import React from "react";
import useAuthViewModel from "../../viewModel/AuthViewModel.ts";
import { Button, Card, styled, Typography} from "@mui/material";

const CardForm = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));


const Authorized: React.FC = () => {
    const {logout} = useAuthViewModel();

    const handleLogout = async () => {
        await logout();
    }

    return <div>
        <CardForm variant={"outlined"}>
        <Typography
        component={"h1"}
        variant={"h4"}
        >
            Authorized
        </Typography>
        <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </CardForm>
    </div>
}

export default Authorized