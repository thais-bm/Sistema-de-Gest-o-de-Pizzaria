import React from 'react'
import axios from 'axios';
import { useEffect, useState, useContext, createContext } from 'react';

const ProdutosContext = createContext();

export function ProdutosProvider({ children }) {

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

  return (
    <ProdutosContext.Provider value={{ produtos, erro }}>
      {children}
    </ProdutosContext.Provider>
  )
}

export function useProdutos() {
  return useContext(ProdutosContext);
}
