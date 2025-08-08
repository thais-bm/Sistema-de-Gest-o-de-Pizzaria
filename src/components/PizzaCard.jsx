import React from 'react'
import './PizzaCard.css'

const PizzaCard = ({pizza}) => {
  return (
   <div class="card">
    <div class="badge">Mais Vendida!</div>
    <div class="tilt">
    <div class="img">
      <img src={pizza.image}/>
    </div>
  </div>
  <div class="info">
    <div class="cat">Pizzas mais vendidas</div>
    <h2 class="title">{pizza.title}</h2>
    <p class="desc"> </p>
    <div class="feats">
    <span class="feat">Pizza</span>
    <span class="feat">Salgada</span>
    <span class="feat">Promoção</span>
    </div>
    <div class="bottom">
    {pizza.price && (
        <div className="price">
          <span className="new">R$ {pizza.price}</span>
        </div>
    )}
    <button class="btn">
      <span>Adicionar ao carrinho</span>
      <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

