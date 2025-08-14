import React from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import { Container, IconButton, Typography, Box, Card, CardContent, Stack, Button, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LockIcon from '@mui/icons-material/Lock';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';


const Entregas = () => {
  const { pedidosPendentes, removerDaEntrega } = useCarrinho();

  const navigate = useNavigate();

  const handleCardapioClick = () => {
    navigate('/Cardapio');
  };

  const handleEntregasClick = () => {
    navigate('/Entregas');
  };

  const handleAcessoRestritoClick = () => {
    navigate('/login');
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100vh',
        width: '100%',
        backgroundImage: 'url("/logo/fundo.jpeg")',
        paddingTop: '20px',
      }}
    >
      {/* Título */}
      <Box
        sx={{
          border: '2px solid #291c0f',
          color: 'rgb(248, 230, 220)',
          textAlign: 'center',
          backgroundColor: '#6c1305',
          WebkitTextStroke: '1px rgb(66, 26, 14)',
          borderRadius: '50px',
          maxWidth: '600px',
          margin: '0 auto',
          padding: '10px 20px',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            WebkitTextStroke: '2px rgb(0,0,0)',
            textTransform: 'uppercase',
            backgroundColor: '#ffffffff',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            margin: 0,
          }}
        >
          Entregas
        </Typography>
      </Box>

      {/* Lista de pedidos */}
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
            <Typography
              variant="h6"
              sx={{
                color: 'white',
              }}
            >
              Nenhum entrega pendente!!!
            </Typography>

         )}

        {pedidosPendentes.map((pedido) => (
          <Card
            key={pedido.id}
            sx={{
              width: '400px',
              height: '450px',
              justifyContent: 'center',
              padding: '10px 20px',
              borderRadius: '60px',
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
                {pedido.entrega === 'mesa' ? `Mesa ${pedido.mesa}` : 'Entrega'}
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
            <CardContent>

              <Typography><strong>Cliente:</strong> {pedido.nome}</Typography>
              <Typography><strong>Data:</strong> {pedido.data}</Typography>
              <Typography><strong>Entrega:</strong> {pedido.entrega}</Typography>
              
              <Typography sx={{ mt: 3, fontWeight: 'bold' }}>Itens:</Typography>
              
              {pedido.itens.map((item) => (
                <Typography key={item.id}>
                  {item.quantidade}x {item.title} - R$ {item.preco} ({item.tamanho})
                </Typography>
              ))}
              
              <Typography sx={{ mt: 3, fontWeight: 'bold' }}>
                Valor total: R$ {pedido.valorTotal}
              </Typography>
              
              <Typography><strong>Endereço:</strong> {pedido.endereco}</Typography>
            </CardContent>

            {/* Botões */}
            <CardActions>
              <Stack direction="row" spacing={1}>
                <Button
                  onClick={ () => {removerDaEntrega(pedido.id); navigate("/Cardapio")}}
                  variant="contained" 
                  color="success" 

                  sx={{
                    position: 'relative',
                    borderRadius: '6px',
                    boxShadow:
                      'rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 -3px 0 inset',
                    border: '1px solid rgb(66, 26, 14)',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '18px',

                    textTransform: 'none',
                    transition: 'box-shadow .15s, transform .15s',
                    '&:focus': {
                      boxShadow:
                        '#4caf50 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #4caf50 0 -3px 0 inset',
                    },
                    '&:hover': {
                      boxShadow:
                        'rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #4caf50 0 -3px 0 inset',
                      transform: 'translateY(-2px)',
                    },
                    '&:active': {
                      boxShadow: '#db410e 0 3px 7px inset',
                      transform: 'translateY(2px)',
                    },
                  }}
                >
                  Entregue
                </Button>
                <Button
                  onClick={ () => {removerDaEntrega(pedido.id); navigate("/Cardapio")}}
                  variant="contained"
                  color="primary"
                  sx={{
                    position: 'relative',
                    borderRadius: '6px',
                    boxShadow:
                      'rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 -3px 0 inset',
                    border: '1px solid rgb(66, 26, 14)',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '18px',
                    color: '#fff',
                    textTransform: 'none',
                    transition: 'box-shadow .15s, transform .15s',
                    '&:focus': {
                      boxShadow:
                        '#d75f03 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #d64b0a 0 -3px 0 inset',
                    },
                    '&:hover': {
                      boxShadow:
                        'rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #ce6107 0 -3px 0 inset',
                      transform: 'translateY(-2px)',
                    },
                    '&:active': {
                      boxShadow: '#db410e 0 3px 7px inset',
                      transform: 'translateY(2px)',
                    },
                  }}
                >
                  Servido
                </Button>
              </Stack>
            </CardActions>
          </Card>
        ))}
      </Container>

        {/*footer*/}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "	#6c1305",
          color: "white",
          justifyContent: 'space-between',
          textAlign: "center",
          py: 1,
          gap: '8px',
        }}
      >
        <IconButton
            onClick={handleCardapioClick}
            color="inherit"
            aria-label="Acesso Restrito"
            size="large"
            sx={{
              '&:hover': {
                backgroundColor: 'primary.main', 
                transition: 'background-color 0.3s',
              },
            }}
          >
            <RestaurantMenuIcon sx = {{fontSize: '30px'}}  />
          </IconButton>

        <IconButton
            onClick={handleEntregasClick}
            color="inherit"
            aria-label="Acesso Restrito"
            size="large"
            sx={{
              '&:hover': {
                backgroundColor: 'primary.main', 
                transition: 'background-color 0.3s',
              },
            }}
          >
            <LocalShippingIcon sx = {{fontSize: '30px'}}  />
          </IconButton>

        <IconButton
            onClick={handleAcessoRestritoClick}
            color="inherit"
            aria-label="Acesso Restrito"
            size="large"
            sx={{
              '&:hover': {
                backgroundColor: 'primary.main', 
                transition: 'background-color 0.3s',
              },
            }}
          >
            <LockIcon sx = {{fontSize: '30px'}}  />
          </IconButton>

      </Box>

    </Container>
  );
};

export default Entregas;
