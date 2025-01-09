import './userInfo.scss'
import React, { useEffect } from 'react'
import useUserInfoViewModel from '@views/layouts/sidebar/components/userInfo/useUserInfoViewModel'

const UserInfo: React.FC = () => {
  const { authorization, init, logout, routeLoginPage } = useUserInfoViewModel()

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="user-info">
      {authorization.isAuthorized ? (
        <div className="user-info__content">
          <span className="user-info__name">{authorization.userInfo.name}</span>
          <button className="user-info__logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <button className="user-info__login-button" onClick={routeLoginPage}>
          Login
        </button>
      )}
    </div>
  )
}

export default UserInfo
