import React from 'react'
import PizzaCard from '../components/PizzaCard'
import Header from '../components/Header'
import "./Cardapio.css"
import { useState } from 'react'
import { useProdutos } from "../context/ProdutosContext";

const Cardapio = () => {
  const {produtos, ingredientes, categorias} = useProdutos();

  const [mostrarFiltrosIng, setMostrarFiltrosIng] = useState(false);
  const [mostrarFiltrosTipos, setMostrarFiltrosTipos] = useState(false);
  const [ingredienteSelecionado, setIngredienteSelecionado] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");

  //Pizzas filtradas por ingredientes (que estão no produtosContext)
  const pizzasFiltradas = ingredienteSelecionado
    ? produtos.filter(pizza =>
        pizza.ingredients[0]
        .toLowerCase()
          .includes(ingredienteSelecionado.toLowerCase())
      )
    : produtos;

  //Produtos filtradas por tipos
  const tiposFiltrados = tipoSelecionado
    ? produtos.filter(produto=> produto.subcategory == tipoSelecionado)
    : produtos;

  const pizzasSalgadas = produtos.filter(p => p.category === "pizza" && p.subcategory === "salgada");
  const pizzasDoces = produtos.filter(p => p.category === "pizza" && p.subcategory === "doce");
  const bebidasRefri = produtos.filter(p => p.category === "bebida" && p.subcategory === "refrigerante");
  const bebidasVinho = produtos.filter(p => p.category === "bebida" && p.subcategory === "vinho");
  const bebidasAgua = produtos.filter(p => p.category === "bebida" && p.subcategory === "água");

  return (
    <div className="cardapio">
      <div  className='background-cardapio'>
    <Header/>
      <section>
        <div>

        <div className='filtro'>
          <button className='filtro-botao' onClick={() => setMostrarFiltrosIng(!mostrarFiltrosIng)}>
            {mostrarFiltrosIng ? "Ocultar Filtros" : "Filtrar por ingrediente"}
          </button>

          <button className='filtro-botao'  onClick={() => setMostrarFiltrosTipos(!mostrarFiltrosTipos)}>
            {mostrarFiltrosTipos ? "Ocultar Filtros" : "Filtrar por tipo"}
          </button>

          {mostrarFiltrosIng && (
            <div>
              <h3>Selecione um ingrediente:</h3>
              <select
                className='select'
                value={ingredienteSelecionado}
                onChange={(e) => setIngredienteSelecionado(e.target.value)}
              >
                <option value="">Todos</option>
                {ingredientes.map((ing, index) => (
                  <option key={index} value={ing}>
                    {ing}
                  </option>
                ))}
              </select>
            </div>
          )}

          {mostrarFiltrosTipos && (
            <div>
              <h3>Selecione um tipo de produto:</h3>
              <select
                className='select'
                value={tipoSelecionado}
                onChange={(e) => setTipoSelecionado(e.target.value)}
              >
                <option value="">Todos</option>
                {categorias.map((tipo, index) => (
                  <option key={index} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
          )}

          {ingredienteSelecionado && (
            <div>
              <h2 className='produto-h2'>Pizzas filtradas</h2>
              <div className='cards'>
                {pizzasFiltradas.map(pizza => (
                  <PizzaCard key={pizza.id} pizza={pizza} />
                ))}
              </div>
            </div>
          )}

          {tipoSelecionado && (
            <div>
              <h2 className='produto-h2'>Tipos filtrados</h2>
              <div className='cards'>
                {tiposFiltrados.map(tipo => (
                  <PizzaCard key={tipo.id} pizza={tipo} />
                ))}
              </div>
            </div>
          )}
          
            
        </div>

        <h1 className='produto-h1'> Pizzas </h1>
        <div className="tamanhos">
          <div className="tamanho-item">
            <h2 className='tamanhos-tamanho'>Pequena</h2>
            <p>R$ 77,99</p>
          </div>
          <div className="tamanho-item">
            <h2 className='tamanhos-tamanho'>Média</h2>
            <p>R$ 99,99</p>
          </div>
          <div className="tamanho-item">
            <h2 className='tamanhos-tamanho'>Grande</h2>
            <p>R$ 110,99</p>
          </div>
          <div className="tamanho-item">
            <h2 className='tamanhos-tamanho'>Família</h2>
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
          <h2 className='produto-h2'> Vinho </h2>
          <div className='cards'>
          {bebidasVinho.map(pizza => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}

export default Cardapio
