// Em PizzaOrder.jsx

import React, { useState } from 'react';
import './PizzaOrder.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCarrinho } from '../context/CarrinhoContext';
import { useProdutos } from '../context/ProdutosContext'; 

const PizzaOrder = () => {
  const location = useLocation();
  const pizza = location.state?.pizza;
  const navigate = useNavigate();

  const { adicionarAoCarrinho } = useCarrinho();
  const { precosPizza } = useProdutos(); 

  const [tamanho, setTamanho] = useState(null); 
  const [quantidade, setQuantidade] = useState(1);
  const [observacao, setObservacao] = useState('');

  const handleCarrinhoClick = () => {
    if (pizza.category === 'pizza' && !tamanho) {
      toast.error("Por favor, selecione o tamanho da pizza!");
      return;
    }

    // 4. Lógica para encontrar o preço e nome corretos
    const tamanhoSelecionado = precosPizza.find(p => p.id === tamanho);
    const precoFinal = tamanhoSelecionado ? tamanhoSelecionado.preco : pizza.price;
    const nomeTamanho = tamanhoSelecionado ? tamanhoSelecionado.nome : null;

    const itemParaAdicionar = {
      ...pizza,
      id: `${pizza.id}-${tamanho || ''}-${Date.now()}`, // ID único para o item no carrinho: assim diferencia pizzas de tamanhos diferentes
      tamanho: nomeTamanho, // Salva o nome do tamanho (ex: "Pequena, Média, etc")
      quantidade: quantidade, // Quantidade selecionada
      observacao: observacao, // Observação do cliente
      preco: precoFinal, // Preço correto baseado na seleção!
    };

    adicionarAoCarrinho(itemParaAdicionar); // junta tudo e adiciona ao carrinho
    toast.success("Item adicionado ao carrinho!", {
      onClose: () => navigate('/Carrinho') 
    });
  };

    const aumentarQuantidade = () => {
          setQuantidade(prev => prev + 1);
        };

      const diminuirQuantidade = () => {
        setQuantidade(prev => (prev > 1 ? prev - 1 : 1));
      };
 

  return (
    <div className="order">
        
      <img src={pizza.image}/>
      <div className='order-box'>
        <h1>{pizza.title}</h1>
        <h2 >{pizza.ingredients}</h2>
        
        {pizza.category === "pizza" && (
          <div className="tamanho">
          <form>
            <p className='tamanho-pizzas'>Selecione o tamanho da pizza:</p>
            {/* Com base do dicionario no ProdutosContext */}
            {precosPizza.map((precoInfo) => (
              <React.Fragment key={precoInfo.id}>
                <input 
                  type="radio" 
                  id={precoInfo.id} 
                  name="tamanho" 
                  value={precoInfo.id} 
                  onChange={(e) => setTamanho(e.target.value)}
                />
                <label htmlFor={precoInfo.id}>
                  {`Pizza ${precoInfo.nome} (R$${precoInfo.preco})`}
                </label> <br/>
              </React.Fragment>
            ))}
          </form>
          </div>
        )}

      <div className='quantidade'>
        <p className='tamanho-pizzas'>Selecione a quantidade:</p>
        <div className='quantidade-controle'>
          <button type="button" onClick={diminuirQuantidade}> - </button>
          <span>  {quantidade}  </span>
          <button type="button" onClick={aumentarQuantidade}> + </button>
        </div>
      </div>

      <div className='note'>
        <p> Alguma observação? </p>
        <textarea 
            value={observacao} 
            className='cnt'
            onChange={(e) => setObservacao(e.target.value)}
            rows="5" 
            cols="50" 
            placeholder="Ex: Tirar cebola, tirar azeitonas..."
        ></textarea>
        <br/>

        <button className="button-29" onClick={handleCarrinhoClick}> Adicionar ao Carrinho </button>
      </div>
      </div>
    </div>
  );
};

export default PizzaOrder;