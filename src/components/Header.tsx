import React from 'react'
import logo from '../assets/img/header-logo.png'

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo" />
    </header>
  )
}

export { Header }
