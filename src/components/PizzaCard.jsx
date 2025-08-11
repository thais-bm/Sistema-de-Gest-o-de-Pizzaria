import React from 'react'
import './PizzaCard.css'
import { useNavigate } from 'react-router-dom'

//tem que apertar 2 vezes pra ir pro Order dps consertar
const PizzaCard = ({pizza}) => {
  const navigate = useNavigate();

  const handleOrder = () => {
      navigate('/PizzaOrder', { state: { pizza } });
  };

  const getImageUrl = () => {
    // Verifica se a string é Base64
    if (pizza.image.startsWith('data:')) {
      return pizza.image;
    } 
    // Verifica se é um caminho de diretório
    if (pizza.image.startsWith('/images/') || pizza.image.startsWith('/img/') || pizza.image.startsWith('images')){
      return `http://localhost:3001${pizza.image}`;
    }
  };

  return (
   <div className="card">
    {pizza.id === 2 && (
      <div className="badge"> Mais vendido! </div>
    )}
    <div className="tilt">
    <div className="img">
      <img src={getImageUrl()}/>
    </div>
  </div>
  <div className="info">
    <div className="cat">{pizza.ingredients}</div>
    <h2 className="title">{pizza.title}</h2>
    <p className="desc"> </p>
    <div className="feats">
    <span className="feat">{pizza.category}</span>
    <span className="feat">{pizza.subcategory}</span>
    <span className="feat"></span>
    </div>
    <div className="bottom">
    {pizza.price && (
        <div className="price">
          <span className="new">R$ {pizza.price}</span>
        </div>
    )}
    <button className="btn" onClick={handleOrder}>
        <span>Adicionar ao carrinho</span>
    </button>
    </div>
      </div>
    </div>
  )
}

export default PizzaCard

