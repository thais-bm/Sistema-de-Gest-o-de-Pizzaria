import React, { createContext, useState, useContext } from 'react';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho(prevItems => {
      return [...prevItems, produto];
    });
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, limparCarrinho}}>
      {children}
    </CarrinhoContext.Provider>
  );
}


export function useCarrrinho() {
  return useContext(carrinhoContext);
}