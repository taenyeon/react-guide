import React from 'react'
import useLoginViewModel from '../../../auth/components/login/useLoginViewModel'
import './login.scss'

const Login: React.FC = () => {
  const { username, password, login, inputUsername, inputPassword } = useLoginViewModel()
  return (
    <div className="login">
      <p className="login__title">Login</p>
      <div className="login__form">
        <input
          className={`login__input ${username.error ? 'login__input--error' : ''}`}
          placeholder="username"
          value={username.value}
          onChange={event => inputUsername(event.target.value)}
        />
        {username.error && <p className="login__input-error">{username.error}</p>}
        <input
          className={`login__input ${password.error ? 'login__input--error' : ''}`}
          placeholder="password"
          value={password.value}
          onChange={event => inputPassword(event.target.value)}
        />
        {password.error && <p className="login__input-error">{password.error}</p>}
        <button className="login__button" onClick={login}>
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
