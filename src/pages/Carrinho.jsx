import React from 'react'
import { useCarrinho } from '../context/CarrinhoContext';
import { useNavigate } from 'react-router-dom';
import "./Carrinho.css"

//A quantidade não muda D:
const Carrinho = () => {
  const { carrinho, removerDoCarrinho, limparCarrinho, valorTotal } = useCarrinho();
  const navigate = useNavigate();


  return (
    <main className='carrinho'>
      {carrinho.length === 0 ? (
        <section className='carrinho-vazio'>  
          <p>Seu carrinho está vazio :(</p>
          <br />
          <p>Por que você não dá uma olhada no nosso cardápio e faz um pedido?</p>

          <img 
            src='/imagens/empty_cart.gif' 
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
                    <p>Preço: R$ {item.preco}</p>
                    <p>Quantidade: {item.quantidade}</p>
                  </div>

                   <button className="btn-remover" onClick={() => removerDoCarrinho(item.id)}>Remover</button>
                
                </div>
              ))}
            </div>

            <div className='carrinho-total'>
              <h2>Total: R$ {valorTotal}</h2>
              <button onClick={() => navigate('/checkout')} className='btn'>Finalizar Compra</button>
            </div>

        </section>
      )
      }

    </main>
  )
}

export default Carrinho