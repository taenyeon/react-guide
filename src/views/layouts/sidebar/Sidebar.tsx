import React from 'react'
import './sidebar.scss'
import Menu from '@views/layouts/sidebar/components/menu/Menu'
import UserInfo from '@views/layouts/sidebar/components/userInfo/UserInfo'

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__menu-list">
        <Menu to={'/'} label={'MAIN'} />
      </div>
      <div className="sidebar__user-info">
        <UserInfo />
      </div>
    </div>
  )
}

export default Sidebar
