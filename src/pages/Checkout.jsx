import React from 'react'
import { useCarrinho } from '../context/CarrinhoContext';
import { useNavigate } from 'react-router-dom';
import { set } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

const notify = () => toast.success("Compra realizada com sucesso!");

const Checkout = () => {
  const { valorTotal, limparCarrinho } = useCarrinho();
  const navigate = useNavigate();

  // Estado para guardar metodo de pagamento
  const [metodoPagamento, setMetodoPagamento] = React.useState(null);

  const handleFinalizarCompra = (e) => {
    if (!metodoPagamento) {
    if (e && e.preventDefault) e.preventDefault();
    alert("Por favor, selecione um método de pagamento!");
    return;
  }
    limparCarrinho(); 
    notify(); 
    setTimeout(() => {
      navigate('/'); 
    }, 2000);
  };


  const formularioCartao = ( {comParcelamento} ) => {
    // Lógica para calcular o valor total com parcelamento
    // limite ta 6x
    const opcoesParcelamento = () => {
      const parcelas = [];
      for (let i = 1; i <= 6; i++) {
        const valorParcela = (valorTotal / i).toFixed(2);
        parcelas.push(
          <option key={i} value={i}>
            {i}x de R$ {valorParcela} {i > 1 ? 'sem juros' : ''}
          </option>
        );
      }
      return parcelas;
    };

    // Aqui fica a renderização do formulário de cartão
    // Condicional para mostrar o parcelamento ou nao (que é debito)

    return (
      <section className="form-cartao">
      <h4>Pagamento com Cartão de Crédito</h4>
        <p>Insira os dados do seu cartão de crédito abaixo:</p>
        <p>Você pode encontrar os dados no seu cartão igual no exemplo abaixo</p>
        <img src="images/exemplo-cartao.png" alt="Exemplo de Cartão"/>

        <form onSubmit={handleFinalizarComprar} className='form-checkout'>
          <input type="text" placeholder="Nome no Cartão (Ex.: Fulano de Tal)" required />
          <input type="tel" inputMode="numeric" placeholder="Número do Cartão (Ex.: 1234 5678 9101 1121)" maxLength="16" required />
          
          <div className="form-row">
            <input type="text" placeholder="Validade (MM/AA)  " required maxLength="5" />
            <input type="tel" inputMode="numeric" placeholder="CVV (Ex.: 123)" maxLength="3" required />
        </div>

        {/* Agora vem a parte que depende a selecao de debito e credito*/}
        {comParcelamento && (
          <select defaultValue="" required className='select-parcelamento'>
            <option value="" disabled>Selecione o número de parcelas</option>
            {opcoesParcelamento()}
          </select>
        )}

        <button type="submit" className="btn-pagar">Pagar Agora</button>

        </form>
      </section>
    );
  };

  const formularioPix = () => {
    return (
      <section className="form-pix">
        <h4>Pague com Pix</h4>
        <p>Escaneie o QR Code abaixo com o app do seu banco:</p>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://youtu.be/sNF2Y8dvPNs?si=3s3hTLHiFXjplRtW`}
          alt="QR Code para pagamento via Pix"
          className="qr-code"
        />

        <p>Ou copie a chave Pix abaixo:</p>
        <input type="text" id='chave-pix' readOnly value={`https://youtu.be/sNF2Y8dvPNs?si=3s3hTLHiFXjplRtW`}/>

        <button onClick={() => handleFinalizarCompra()} className="btn-pagar">Confirmar Pagamento</button>
      </section>
    );

  };

  // Agora rendeeriza o checkout que exibe o valor total e os metodos de pagamento
  return (
    <main className='pagina-checkout'>
      <h2>Finalizar Compra</h2>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} /> 

      <div className="checkout-container">
        <div className="resumo-pedido">
          <h4>Resumo do Pedido</h4>
          <div className="total-pedido">
            <span>Valor Total: </span>
            <strong>R$ {valorTotal}</strong>
          </div>
        </div>
      </div>

      <div className="selecao-pagamento">
        <h4>Escolha a forma de pagamento:</h4>
        <div className="botoes-pagamento">
          <button onClick={() => setMetodoPagamento('pix')} className={metodoPagamento === 'pix' ? 'ativo' : ''}>Pix</button>
          
          <button onClick={() => setMetodoPagamento('credito')} className={metodoPagamento === 'credito' ? 'ativo' : ''}>Crédito</button>
          
          <button onClick={() => setMetodoPagamento('debito')} className={metodoPagamento === 'debito' ? 'ativo' : ''}>Débito</button>
        </div>
      </div>

      {/* Renderiza o formulário de acordo com o método de pagamento selecionado */}

      {metodoPagamento === 'pix' && formularioPix()}
      {metodoPagamento === 'credito' && formularioCartao({ comParcelamento: true })}
      {metodoPagamento === 'debito' && formularioCartao({ comParcelamento: false })}
    </main>
  )
}

export default Checkout;