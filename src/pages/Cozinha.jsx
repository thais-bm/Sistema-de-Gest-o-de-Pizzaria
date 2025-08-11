import React from 'react';
import { Container, Typography, Box, Card, CardContent, Stack, Button, CardActions, Grid} from '@mui/material';
import "./Cozinha.css"

const Cozinha = () => {
  return (
     
      <Container maxWidth={false} className="container-cozinha">
        <Box className="box-titulo">
          <Typography variant="h2" className="titulo-cozinha">
            Cozinha
          </Typography>
        </Box>

          <Container className='container-pedidos'>
            
            {/* Coluna das mesas */}

            <Card className="pedidos">
              <CardContent className='header-pedido'>
                <Typography variant="h5" className="tipo-pedido">Mesa</Typography>
                {/* Colocar o ID do pedido aq*/}
                <Typography variant="h6" className='id'>ID: </Typography>
              </CardContent>
              <CardActions>
                <Stack direction="row" spacing={1}>
                  <Button className='botao' variant="contained" color="success"  disableElevation>Pedido pronto</Button>
                  <Button className='botao' variant="contained" color="error"  disableElevation>Cancelar</Button>
                </Stack>
              </CardActions>
            </Card>


          {/* Coluna das entregas */}

            <Card className="pedidos">
              <CardContent className='header-pedido'>
                <Typography variant="h5" className='tipo-pedido'>Entrega</Typography>
                <Typography variant="h6" className='id'>ID:  </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
                <Stack direction="row" spacing={1}>
                  <Button className='botao' variant="contained" color="success"  disableElevation >Enviar para entrega</Button>
                  <Button className='botao' variant="contained" color="error"  disableElevation >Cancelar</Button>
                </Stack>
              </CardActions>
            </Card>

          </Container>

      </Container>
    
  );
};

export default Cozinha;
