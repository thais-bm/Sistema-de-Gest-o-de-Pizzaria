import React, { useState } from 'react'
import { useCarrinho } from '../context/CarrinhoContext';
import { useNavigate } from 'react-router-dom';
import "./Carrinho.css"
import { useId } from 'react';
import { CarrinhoProvider } from '../context/CarrinhoContext';

const Carrinho = () => {

  const {carrinho, nome, setNome, adicionarHistorico, enviarParaCozinha, valorTotal, limparCarrinho, removerDoCarrinho, entrega, setEntrega, mesa, setMesa, endereco, setEndereco } = useCarrinho();
  const navigate = useNavigate();

  const uniqueId = useId();

  const handleChangeMesa = (event) => {
    setMesa(event.target.value);
  };

  const handleEnviarParaCozinha = () => {

  const pedido = {
    id: uniqueId,
    itens: carrinho,
    entrega,
    mesa,
    endereco,
    valorTotal,
    nome,
    data: new Date().toLocaleString()
    };
    
    adicionarHistorico(pedido);
    enviarParaCozinha(pedido);
    navigate('/Cozinha');

  }

  return (
    <main className='carrinho'> 
      {carrinho.length === 0 ? (
        <section className='carrinho-vazio'>  
          <p className='carinha-vazio-header'>Seu carrinho está vazio :(</p>
          <br />
          <p className='olhada-produtos'>Por que você não dá uma olhada no nosso cardápio e faz um pedido?</p>

          <img 
            src='/images/empty_cart.gif' 
            alt="Carrinho vazio" 
            width={200} 
          />

          <button onClick={() => navigate('/Cardapio')} className='btn'>
            Ir ao Cardápio
          </button>

        </section>

      ) : 
      // Lógica do Carrinho com Itens
      ( 
        <section className='carrinho-com-itens'>
            <h1 className='carrinho-nome'>Carrinho</h1>
            <div className='carrinho-itens'>
              {carrinho.map((item) => (
                <div key={item.id} className='carrinho-item'>
                  <img src={item.image} alt={item.title} />
                  
                  <div className='carrinho-item-info'>
                    <h2>{item.title}</h2>
                    <h3>Preço: R$ {item.preco}</h3>
                    <h3>Quantidade: {item.quantidade}</h3>
                    <h3>Tamanho: {item.tamanho}</h3>
                  
                    <button  style={{background: 'FireBrick'}} className="button-29" onClick={() => removerDoCarrinho(item.id)}>Remover</button>
                  </div>


                </div>
              ))}
            </div>

            <div className='carrinho-total'>
              <h2>Total: R$ {valorTotal}</h2>
            </div>

            <div className='comanda'>
              <h2> Informe se é para entrega em casa ou mesa </h2>
              <form>
                <label htmlFor="mesa">Mesa</label>
                <input
                  type="radio"  checked={entrega === "mesa"} id="mesa" name="entrega" value="mesa"
                  onChange={(e) => setEntrega(e.target.value)}
                />
                <br/>

                <label htmlFor="casa">Entrega</label>
                <input
                  type="radio" checked={entrega === "casa"} id="casa" name="entrega" value="casa"
                  onChange={(e) => setEntrega(e.target.value)}
                />
              </form>
            

          {(() => {
            if (entrega === "mesa") {
              return (
                <div>
                  <h2> Informe o número da mesa: </h2>
                  <select id="mesa" value={mesa} onChange={handleChangeMesa}>
                    <option value="301">301</option>
                    <option value="125">125</option>
                    <option value="174">174</option>
                    <option value="101">101</option>
                    <option value="1">1</option>
                    <option value="239">239</option>
                    <option value="57">57</option>

                  </select>
                </div>
              );
            } else if (entrega === "casa") {
              return (
                <div>
                  <h2>Informe o endereço de entrega:</h2>

                  <input
                    className='endereco'
                    type='text'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite seu nome"
                  
                  />
                  <input
                    className='endereco'
                    type="text"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    placeholder="Digite seu endereço"
                  />
                </div>
              );
            } else {
              return null;
            }
          })()}

          </div>


          <div className="botoes-carrinho">
            <button onClick={() => {handleEnviarParaCozinha(); navigate('/Pagamento'); }}  className='btn' style={{background: 'green'} }>Enviar para a Cozinha</button>
            <button onClick={limparCarrinho} className='btn' style={{background: 'FireBrick'}}>Limpar Carrinho</button>
            <button onClick={() => navigate('/Cardapio')} className='btn' style={{background: 'gold'}}>Continuar Comprando</button>
          </div>
          
        </section>
      )
      }
    </main>
  )
}

export default Carrinho