import React from 'react'
import { Link} from 'react-router-dom'
import './Header.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleCarrinhoClick = () => {
    navigate('/Carrinho');
  };

  const handleAcessoRestritoClick = () => {
    navigate('/login');
  };

  return (
    <header>
        <div className="header-container">
            <div>
                <h1 className="melting-text">Freddy's Pizzaria</h1>
                <img src='/logo/freddy_pizza.png' alt='Logo' className='logo'/>
            </div>
            <div className="nav-links">
              <button onClick={handleCarrinhoClick} className="button-29" role="button"> 🛒 Carrinho</button>
              <button onClick={handleAcessoRestritoClick} className="button-29" role="button">🚫 Acesso Restrito</button>
            </div>
        </div>      
    </header>
  );
};  

export default Header
