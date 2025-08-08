import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const location = useLocation;

  return (
    <header>
        <div className="header-container">
            <div>
                <h1 className="melting-text">Freedy's Pizzaria</h1>
                <img src='/logo/freddy_pizza.png' alt='Logo' className='logo'/>
            </div>
        </div>      
    </header>
  );
};  

export default Header
