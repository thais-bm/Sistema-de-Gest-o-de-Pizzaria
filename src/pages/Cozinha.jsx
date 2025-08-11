import React from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import { Container, Typography, Box, Card, CardContent, Stack, Button, CardActions, Grid} from '@mui/material';
import "./Cozinha.css"
import { useNavigate } from 'react-router-dom';

const Cozinha = () => {

  const { pedidosPendentes, cancelarPedido } = useCarrinho();
  const navigate = useNavigate();

  return (
     
      <Container maxWidth={false} className="container-cozinha">
        <Box className="box-titulo">
          <Typography variant="h2" className="titulo-cozinha">
            Cozinha
          </Typography>
        </Box>

          <Container className='container-pedidos'>
            {pedidosPendentes.length === 0 && (
              <Typography variant="h6"> Nenhum pedido pendente!!! </Typography>
            )}
            
            {/* Coluna das mesas */}

            {pedidosPendentes.map((pedido) => (
          <Card key={pedido.id} className="pedidos">
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

            <CardActions>
              <Stack direction="row" spacing={1}>
                <Button onClick={ () => {cancelarPedido(pedido.id) ;navigate('/Entregas')}} className='botao' variant="contained" color="success" disableElevation>
                  Pedido pronto
                </Button>
                <Button onClick = {() => cancelarPedido(pedido.id)}className='botao' variant="contained" color="error" disableElevation>
                  Cancelar
                </Button>
              </Stack>
            </CardActions>

          </Card>
        ))}

          </Container>

      </Container>
    
  );
};

export default Cozinha;
