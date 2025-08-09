import React from 'react'
import PizzaCard from '../components/PizzaCard'
import Header from '../components/Header'
import "./Cardapio.css"
import { useProdutos } from "../context/ProdutosContext";

const Cardapio = () => {
  const {produtos} = useProdutos();

  const pizzasSalgadas = produtos.filter(p => p.category === "pizza" && p.subcategory === "salgada");
  const pizzasDoces = produtos.filter(p => p.category === "pizza" && p.subcategory === "doce");
  const bebidasRefri = produtos.filter(p => p.category === "bebida" && p.subcategory === "refrigerante");
  const bebidasVinho = produtos.filter(p => p.category === "bebida" && p.subcategory === "vinho");
  const bebidasAgua = produtos.filter(p => p.category === "bebida" && p.subcategory === "água");

  return (
    <div className="cardapio">
    <Header/>
      <section>
        <div>
        <h1 className='produto-h1'> Pizzas </h1>
        <div className="tamanhos">
          <div className="tamanho-item">
            <h2 className='produto-h2'>Pequena</h2>
            <p>R$ 77,99</p>
          </div>
          <div className="tamanho-item">
            <h2 className='produto-h2'>Média</h2>
            <p>R$ 99,99</p>
          </div>
          <div className="tamanho-item">
            <h2 className='produto-h2'>Grande</h2>
            <p>R$ 110,99</p>
          </div>
          <div className="tamanho-item">
            <h2 className='produto-h2'>Família</h2>
            <p>R$ 130,99</p>
          </div>
        </div>

        <h2 className='produto-h2'> Pizzas salgadas </h2>
        <div className='cards'>
          {pizzasSalgadas.map(pizza => (
            <PizzaCard  key={pizza.id} pizza={pizza} />
          ))}
        </div>

        <h2 className='produto-h2'> Pizzas doces </h2>
        <div className='cards'>
          {pizzasDoces.map(pizza => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
        </div>
      </section>

      <section className='produtos'>
        <h1 className='produto-h1'> Bebidas </h1>

        <div>
          <h2 className='produto-h2'> Água </h2>
          <div className='cards'>
            {bebidasAgua.map(pizza => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        </div>

        <div>
          <h2 className='produto-h2'> Refrigerante </h2>
          <div className='cards'>
            {bebidasRefri.map(pizza => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        </div>

        <div>
          <h2> Vinho </h2>
          <div className='cards'>
          {bebidasVinho.map(pizza => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cardapio
