import React from 'react'
import { Link} from 'react-router-dom'
import './Header.css'

//tem que ajeitar essa header ae

const Header = () => {
  return (
    <header>
        <div className="header-container">
            <div>
                <h1 className="melting-text">Freddy's Pizzaria</h1>
                <img src='/logo/freddy_pizza.png' alt='Logo' className='logo'/>
            </div>
            <button> 🛒 Carrinho</button>
        </div>      
    </header>
  );
};  

export default Header
