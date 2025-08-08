import React from 'react'
import PizzaCard from '../components/PizzaCard'
import Header from '../components/Header'
import "./Cardapio.css"


const Cardapio = ({pizza}) => {
  return (
    <div>
      <Header/>
      <div className="tamanhos">
        <h2> dps deixar essa parte bonitinha</h2>
        <h1> Tamanhos: </h1>
        <h2> Pequena: R$ 72,01 </h2>
        <h2> Grande: R$ 101,01 </h2>
        <h2> Família: R$ 122,01 </h2>
      </div>
      <PizzaCard pizza={pizza}/>
    </div>
  )
}

export default Cardapio
