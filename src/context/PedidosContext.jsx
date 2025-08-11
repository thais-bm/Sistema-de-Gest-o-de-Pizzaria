import React from 'react'
import  { createContext, useState, useContext, useEffect} from 'react';

const PedidosContext = createContext();

export const useHistorico = () => {
  return useContext(PedidosContext);
};


export function PedidosProvider({ children })  {

  //Adiciona todos os pedidos ao historico
  const [totalPedidos, setTotalPedidos] = useState(() => {
    const historico = localStorage.getItem('totalPedidos');
    return historico? JSON.parse(historico) : [];
  });


  useEffect(() => {
    localStorage.setItem('totalPedidos', JSON.stringify(totalPedidos));
  }, [totalPedidos]);


  // Função para adicionar ao historico
  const adicionarAoHistorico = (pedido) => {
    setTotalPedidos(prev => [...prev, pedido]);
  };

  //Funcao para retirar do histórico
  //SOMENTE PARA DEBUG DPS TIRAR
  const removerDoHistorico = (id) => {
    setTotalPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.id !== id));
  };

  // retorna array vazio
  // SOMENTE PARA DEBUG DPS TIRAR pt2
  const limparHistorico = () => {
    setTotalPedidos([]);
  };

  return (
    <PedidosContext.Provider value={{ 
        totalPedidos,
        setTotalPedidos,
        adicionarAoHistorico,
        removerDoHistorico,
        limparHistorico
      }}
      >

      {children}
    </PedidosContext.Provider>
  );
}
