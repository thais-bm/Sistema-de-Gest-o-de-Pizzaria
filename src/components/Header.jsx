import React from 'react'
import { Link} from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header>
        <div className="header-container">
            <div>
                <h1 className="melting-text">Freedy's Pizzaria</h1>
                <img src='/logo/freddy_pizza.png' alt='Logo' className='logo'/>
            </div>
            <button> 🛒 Carrinho</button>
        </div>      
    </header>
  );
};  

export default Header
