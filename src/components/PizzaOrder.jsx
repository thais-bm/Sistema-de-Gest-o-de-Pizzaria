import React from 'react'
import './PizzaOrder.css'
import { useLocation } from 'react-router-dom';

//Queria q isso aq fosse uma pequena pagina tipo
//um pop up que tem do ifood
//n q fosse pra uma pagina diferente aff
// 
const PizzaOrder = () => {
  const location = useLocation();
  const pizza = location.state?.pizza;

  return (
    <div className="order">
        <img src={pizza.image}/>
        <div className='order-box'>
            <h1> {pizza.title} </h1>
            <h2> {pizza.ingredients} </h2>
            
            <form>
                <p>Selecione o tamanho da pizza:</p>

                <input type="radio" id="pizza" name="pizza" value="pequena"/>
                <label for="pequena">Pizza pequena (R$ 77,99)</label> <br/>

                <input type="radio" id="pizza" name="pizza" value="media"/>
                <label for="pequena">Pizza média (R$ 99,99)</label>  <br/>

                <input type="radio" id="pizza" name="pizza" value="grande"/>
                <label for="pequena">Pizza grande (R$ 109,99)</label>  <br/>

                <input type="radio" id="pizza" name="pizza" value="familia"/>
                <label for="pequena">Pizza família (R$ 120,99)</label>  <br/>

            </form>
            
            <p> Alguma observação? </p>
            <textarea rows="5" cols="50" placeholder="Ex: Tirar cebola, tirar azeitonas..."></textarea>
            <br/>

            <button> Adicionar ao Carrinho </button>

        </div>
    </div>
  )
}

export default PizzaOrder