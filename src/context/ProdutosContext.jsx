import React from 'react'
import axios from 'axios';
import { toast,  ToastContainer } from 'react-toastify';
import { useEffect, useState, useContext, createContext } from 'react';

const ProdutosContext = createContext();

// Preços das pizzas
const precosPizza = [
  { id: 'pequena', nome: 'Pequena', preco: 77.99 },
  { id: 'media', nome: 'Média', preco: 99.99 },
  { id: 'grande', nome: 'Grande', preco: 110.99 },
  { id: 'familia', nome: 'Família', preco: 130.99 }
];

const API_URL = 'http://localhost:3001/produtos';

// busca produtos
async function fetchProdutos() {
  const res = await axios.get(API_URL);
  return res.data;
}

export function ProdutosProvider({ children }) {

  // Estado para armazenar os produtos e possíveis erros
  const [produtos, setProdutos] = useState([]);

  //Carrega os produtos
  useEffect(() => {
    async function carregar() {
      const data = await fetchProdutos();
      setProdutos(data);
    }
    carregar();
  }, []);

  const adicionarProduto = async (novoProduto) => {
    const res = await axios.post(API_URL, novoProduto);
    setProdutos(prev => [...prev, res.data]);
  };


  const atualizarProduto = async (id, produtoAtualizado) => {
    const res = await axios.put(`${API_URL}/${id}`, produtoAtualizado);
    setProdutos(prev => prev.map(p => (p.id === id ? res.data : p)));
  };

  const removerProduto = async (id) => {
    toast.success("Item removido com sucesso!");
        setTimeout(() => {
          if (onCancel) onCancel();
        }, 1500); 
    await axios.delete(`${API_URL}/${id}`);
    setProdutos(prev => prev.filter(p => p.id !== id));
  };

  const todosIngredientes = produtos.flatMap(pizza => 
    pizza.ingredients[0].split(",").map(ing => ing.trim().toLowerCase())
  );

  const categorias = [...new Set(produtos.map(p => p.subcategory))];

  const ingredientes= [...new Set(todosIngredientes)];

  return (
    <ProdutosContext.Provider value={{ 
      produtos,  
      precosPizza, 
      ingredientes,
      adicionarProduto,
      removerProduto,
      atualizarProduto,
      categorias

    }}>
      {children}
    </ProdutosContext.Provider>
  )
}

export function useProdutos() {
  return useContext(ProdutosContext);
}