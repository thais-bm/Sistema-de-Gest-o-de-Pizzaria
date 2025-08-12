import React from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import { Container, Typography, Box, Card, CardContent, Stack, Button, CardActions, Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Historico = () => {

  const { pedidosPendentes } = useCarrinho();
  const navigate = useNavigate();

  return (
      <Container>

          <Container className='container-pedidos'>
            {pedidosPendentes.length === 0 && (
              <Typography variant="h6"> Nenhum pedido no histórico :( </Typography>
            )}
            
            {/* Coluna das mesas */}

            {pedidosPendentes.map((pedido) => (
          <Card key={pedido.id} >
            <CardContent className='header-pedido'>
              <Typography variant="h5" className="tipo-pedido">
                {pedido.entrega === 'mesa' ? `Mesa ${pedido.mesa}` : 'Entrega'}
              </Typography>
              <Typography variant="h6" className='id'>
                ID: {pedido.id}
              </Typography>
            </CardContent>

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {pedido.data}
              </Typography>
              {pedido.itens.map((item) => (
                <Typography key={item.id}>
                  {item.quantidade}x {item.title} - R$ {item.preco} (Tamanho: {item.tamanho})
                </Typography>
              ))}
            </CardContent>


          </Card>
        ))}

          </Container>

      </Container>
    
  );
};

export default Historico;
