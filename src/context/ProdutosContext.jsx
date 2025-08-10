import React from 'react'
import axios from 'axios';
import { useEffect, useState, useContext, createContext } from 'react';

const ProdutosContext = createContext();

// Preços das pizzas
const precosPizza = [
  { id: 'pequena', nome: 'Pequena', preco: 77.99 },
  { id: 'media', nome: 'Média', preco: 99.99 },
  { id: 'grande', nome: 'Grande', preco: 110.99 },
  { id: 'familia', nome: 'Família', preco: 130.99 }
];


export function ProdutosProvider({ children }) {

  // Estado para armazenar os produtos e possíveis erros
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await axios.get("/api/produtos.json"); // caminho público no public/
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setErro("Erro ao carregar produtos");
      } 
    }
    carregarProdutos();
  }, []);


  const todosIngredientes = produtos.flatMap(pizza => 
    pizza.ingredients[0].split(",").map(ing => ing.trim().toLowerCase())
  );

  const ingredientes= [...new Set(todosIngredientes)];

  return (
    <ProdutosContext.Provider value={{ produtos, erro, precosPizza, ingredientes}}>
      {children}
    </ProdutosContext.Provider>
  )
}

export function useProdutos() {
  return useContext(ProdutosContext);
}
