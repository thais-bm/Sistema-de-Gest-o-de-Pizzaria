import React from 'react'
import './PizzaOrder.css'
function PizzaOrder({pizza}) {
  return (
    <div className="order">
        <img src={pizza.image}/>
        <h1> {pizza.title} </h1>
        <h2> {pizza.ingredients} </h2>
        <textarea rows="5" cols="50" placeholder="Observações..."></textarea>
    </div>
  )
}

export default PizzaOrder