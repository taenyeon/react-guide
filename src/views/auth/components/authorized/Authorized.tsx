import React from 'react'
import useAuthorizedViewModel from '../../../auth/components/authorized/useAuthorizedViewModel'
import './authorized.scss'

const Authorized: React.FC = () => {
  const { authorization, logout } = useAuthorizedViewModel()
  return (
    <div className="authorized">
      <p className="authorized__title">Authorized</p>
      <p className="authorized__title">name : {authorization.userInfo.name}</p>
      <button className="authorized__button" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Authorized
