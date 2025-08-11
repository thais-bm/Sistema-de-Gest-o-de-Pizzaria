import React from 'react'
import { useCarrinho } from '../context/CarrinhoContext';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Card, CardContent, Stack, Button, CardActions, Grid} from '@mui/material';

const Entregas = () => {

    const { pedidosEntrega, setPedidosEntrega, removerDaEntrega} = useCarrinho();
    const navigate = useNavigate();

  return (
    <div>
       <Container maxWidth={false} className="container-cozinha">
        <Box className="box-titulo">
          <Typography variant="h2" className="titulo-cozinha">
            Entregas
          </Typography>
        </Box>

          <Container className='container-pedidos'>
            {pedidosEntrega.length === 0 && (
              <Typography variant="h6"> Nenhum pedido pendente!!! </Typography>
            )}
            
            {/* Coluna das mesas */}

            {pedidosEntrega.map((pedido) => (
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

              {pedidosEntrega.map((item) => (
                <Typography key={item.id}>
                  {item.quantidade}x {item.title} - R$ {item.preco} (Tamanho: {item.tamanho})
                </Typography>
              ))}

              

            </CardContent>

            <CardActions>
              <Stack direction="row" spacing={1}>
                <Button onClick={ () => {removerDaEntrega(pedido.id); navigate("/Cardápio")}} className='botao' variant="contained" color="success" disableElevation>
                  Entregue
                </Button>
                <Button onClick = {() => removerDaEntrega(pedido.id)}className='botao' variant="contained" color="error" disableElevation>
                  Cancelado
                </Button>
              </Stack>
            </CardActions>

          </Card>
        ))}

          </Container>

      </Container>
    </div>
  )
}

export default Entregas
