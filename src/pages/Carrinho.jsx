import React, { useState } from 'react'
import { useCarrinho } from '../context/CarrinhoContext';
import { useNavigate } from 'react-router-dom';
import "./Carrinho.css"

//A quantidade não muda D:
const Carrinho = () => {
  const { carrinho, removerDoCarrinho, limparCarrinho, valorTotal } = useCarrinho();
  const navigate = useNavigate();

  const[entrega, setEntrega] = useState(null)
  const [mesa, setMesa] = useState(0)
  const [endereco, setEndereco] = useState(null)

   const handleChangeMesa = (event) => {
    setMesa(event.target.value);
  };

  

  return (
    <main className='carrinho'>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
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
                  type="radio" id="mesa" name="entrega" value="mesa"
                  onChange={(e) => setEntrega(e.target.value)}
                />
                <br/>

                <label htmlFor="casa">Entrega</label>
                <input
                  type="radio" id="casa" name="entrega" value="casa"
                  onChange={(e) => setEntrega(e.target.value)}
                />
              </form>
            

          {entrega === "mesa" ? (
            <div>
              <h2> Informe o número da mesa: </h2>
               <select id="mesa" value={mesa} onChange={handleChangeMesa}>
                <option value="301">301</option>
                <option value="125">125</option>
                <option value="174">174</option>
              </select>
            </div>

          ): entrega === "casa" ?(
            <div>
              <h2>Informe o endereço de entrega:</h2>
             <textarea
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Digite seu endereço..."
                className='endereco'
              />
            </div>
          ): null }

          </div>


          <div className="botoes-carrinho">
            <button onClick={() => navigate('Pagamento')} className='btn' style={{background: 'green'}}>Enviar para a Cozinha</button>
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