import React from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Historico = () => {
  const { pedidosPendentes } = useCarrinho();
  const navigate = useNavigate();

  return (
    <Container>
      <Container
        sx={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '16px',
          flexWrap: 'wrap',
        }}
      >
        {pedidosPendentes.length === 0 && (
          <Typography variant="h6">Nenhum pedido no histórico :(</Typography>
        )}

        {pedidosPendentes.map((pedido) => (
          <Card
            key={pedido.id}
            sx={{
              width: '400px',
              border: '2px solid #6c1305',
              height: '450px',
              justifyContent: 'center',
              padding: '10px 20px',
              borderRadius: '60px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Cabeçalho */}
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 10px',
                marginBottom: '10px',
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  border: '2px solid #291c0f',
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: '30px',
                  backgroundColor: '#6c1305',
                  borderRadius: '50px',
                  maxWidth: '150px',
                  padding: '10px 20px',
                }}
              >
                {pedido.entrega === 'mesa'
                  ? `Mesa ${pedido.mesa}`
                  : 'Entrega'}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  border: '2px solid #291c0f',
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: '20px',
                  backgroundColor: '#b32900',
                  borderRadius: '10px',
                  maxWidth: '120px',
                  padding: '10px 10px',
                }}
              >
                ID: {pedido.id}
              </Typography>
            </CardContent>

            {/* Conteúdo */}
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="h5" color="black">
                Cliente: {pedido.nome}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {pedido.data}
              </Typography>

              {pedido.itens.map((item) => (
                <Typography key={item.id}>
                  {item.quantidade}x {item.title} - R$ {item.preco} (Tamanho:{' '}
                  {item.tamanho})
                </Typography>
              ))}

              <Typography variant="h6" color="black">
                Valor total: {pedido.valorTotal}
              </Typography>

              <Typography variant="h6" color="black">
                Endereço: {pedido.endereco}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Container>
  );
};

export default Historico;
