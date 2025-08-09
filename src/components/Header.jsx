import React from 'react'
import { Link} from 'react-router-dom'
import './Header.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleCarrinhoClick = () => {
    navigate('/Carrinho');
  };

  return (
    <header>
        <div className="header-container">
            <div>
                <h1 className="melting-text">Freddy's Pizzaria</h1>
                <img src='/logo/freddy_pizza.png' alt='Logo' className='logo'/>
            </div>
            <button onClick={handleCarrinhoClick} class="button-29" role="button"> 🛒 Carrinho</button>
        </div>      
    </header>
  );
};  

export default Header
