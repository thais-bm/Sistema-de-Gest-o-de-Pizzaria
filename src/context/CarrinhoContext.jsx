import React, { createContext, useState, useContext, useEffect} from 'react';
import { set } from 'react-hook-form';

const CarrinhoContext = createContext();

// hook pra facilitar o uso do contexto
export const useCarrinho = () => {
  return useContext(CarrinhoContext);
};

// transformei em arrow function pro professor não reclamar 
// e porque é pra manter o padrão
export const CarrinhoProvider = ({ children }) => {

  const [pedidosPendentes, setPedidosPendentes] = useState(() => {
  const pedidosSalvos = localStorage.getItem('pedidosPendentes');
  return pedidosSalvos ? JSON.parse(pedidosSalvos) : [];
  });

  useEffect(() => {
    localStorage.setItem('pedidosPendentes', JSON.stringify(pedidosPendentes));
  }, [pedidosPendentes]);

  // Função para adicionar pedido à lista de pendentes
  const enviarParaCozinha = (pedido) => {
    setPedidosPendentes(prev => [...prev, pedido]);
  };

  // função para cancelar o pedido dos pedidosPendentes
  const cancelarPedido = (id) => {
    setPedidosPendentes((prevPedidos) => prevPedidos.filter((pedido) => pedido.id !== id));
  };

  const [carrinho, setCarrinho] = useState(() => {
  const carrinhoSalvo = localStorage.getItem("carrinho");
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  // atualiza localStorage toda vez que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

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

  const [id, setID] = useState(() => localStorage.getItem('ID') || null);
  const [entrega, setEntrega] = useState(() => localStorage.getItem('entrega') || null);
  const [mesa, setMesa] = useState(() => localStorage.getItem('mesa') || "101");
  const [endereco, setEndereco] = useState(() => localStorage.getItem('endereco') || '');

  useEffect(() => {
    if (id) localStorage.setItem('ID', id);
  }, [id]);

  useEffect(() => {
    if (entrega) localStorage.setItem('entrega', entrega);
  }, [entrega]);

  
  useEffect(() => {
    if (mesa) localStorage.setItem('mesa', mesa);
  }, [mesa]);

  useEffect(() => {
    if (endereco) localStorage.setItem('endereco', endereco);
  }, [endereco]);

  return (
    <CarrinhoContext.Provider value={{ 
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        valorTotal,
        id,
        setID,
        entrega,
        setEntrega,
        mesa,
        setMesa,
        endereco,
        setEndereco,
        pedidosPendentes,
        enviarParaCozinha,
        cancelarPedido  
      }}
      >

      {children}
    </CarrinhoContext.Provider>
  );
}

