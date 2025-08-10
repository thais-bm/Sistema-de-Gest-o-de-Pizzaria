import React, { createContext, useState, useContext } from 'react';
import { set } from 'react-hook-form';

const CarrinhoContext = createContext();

// hook pra facilitar o uso do contexto
export const useCarrinho = () => {
  return useContext(CarrinhoContext);
};

// transformei em arrow function pro professor não reclamar 
// e porque é pra manter o padrão
export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);


  // mexi pq n tava aparecendo a quantidade no carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prevCarrinho) => {
      const itemNoCarrinho = prevCarrinho.find((item) => item.id === produto.id);
      if (itemNoCarrinho) {
        return prevCarrinho.map((item) => item.id === produto.id ? { ...item, quantidade: item.quantidade + produto.quantidade } : item);
      }
      return [...prevCarrinho, { ...produto, quantidade: produto.quantidade }];
    });
  };

  // Remover do carrinho                
  // retorna um array novo sque adiciona todo mundo menos o item com o ID passado
  const removerDoCarrinho = (produtoId) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.filter((item) => item.id !== produtoId)
    );
  };

  // retorna array vazio
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  // calculador de preço total
  const valorTotal = (carrinho.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0)).toFixed(2); // assim só tem 2 digitos

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, limparCarrinho, valorTotal , removerDoCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}


export function useCarrrinho() {
  return useContext(carrinhoContext);
}