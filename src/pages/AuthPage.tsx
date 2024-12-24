import * as React from "react";
import useAuthViewModel from "../viewModel/AuthViewModel.ts";
import {useEffect, useState} from "react";

const AuthPage: React.FC = () => {
    const {authorization, isLoading, init, login, logout} = useAuthViewModel();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        await login(username, password)
    }

    const handleLogout = async () => {
        await logout()
    }

    useEffect(() => {
        init()
    }, [init])

    if (isLoading) return <p>Loading...</p>
    if (!authorization.isAuthorized) return (
        <div>
            <h2>try Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">username</label>
                <input type="text" id="username" value={username} placeholder="username"
                       onChange={event => setUsername(event.target.value)}/>
                <label htmlFor="password">password</label>
                <input type="password" id="password" value={password} placeholder="password"
                       onChange={event => setPassword(event.target.value)}/>
                <button type={"submit"}>
                    login
                </button>
            </form>
        </div>
    )
    return (
        <div>
            <h2>Authorized</h2>
            <button type={"button"} onClick={handleLogout}>logout</button>
        </div>
    )
}

export default AuthPage;