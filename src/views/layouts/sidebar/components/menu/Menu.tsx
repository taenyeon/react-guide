import React from 'react'
import './menu.scss'
import { Link } from 'react-router-dom'

interface MenuProps {
  to: string
  label: string
}

const Menu: React.FC<MenuProps> = ({ to, label }) => {
  return (
    <div className="menu">
      <Link to={to}>{label}</Link>
    </div>
  )
}

export default Menu
