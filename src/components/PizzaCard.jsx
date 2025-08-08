import React from 'react'
import './PizzaCard.css'
import { useNavigate } from 'react-router-dom'

//tem que apertar 2 vezes pra ir pro Order dps consertar
const PizzaCard = ({pizza}) => {
  const navigate = useNavigate();

  const handleOrder = () => {
      navigate('/PizzaOrder', { state: { pizza } });
    };
  return (
   <div className="card">
    <div className="badge">Mais Vendida!</div>
    <div className="tilt">
    <div className="img">
      <img src={pizza.image}/>
    </div>
  </div>
  <div className="info">
    <div className="cat">Pizzas mais vendidas</div>
    <h2 className="title">{pizza.title}</h2>
    <p className="desc"> </p>
    <div className="feats">
    <span className="feat">{pizza.category}</span>
    <span className="feat">{pizza.subcategory}</span>
    <span className="feat">Promoção</span>
    </div>
    <div className="bottom">
    {pizza.price && (
        <div classNameName="price">
          <span classNameName="new">R$ {pizza.price}</span>
        </div>
    )}
    <button className="btn">
        <span onClick={handleOrder}>Adicionar ao carrinho</span>

      <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    </button>
    </div>
      </div>
    </div>
  )
}

export default PizzaCard

