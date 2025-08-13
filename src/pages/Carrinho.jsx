import React from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import { useNavigate } from 'react-router-dom';
import { useId } from 'react';
import {Box, Typography, Button, Radio, RadioGroup, FormControlLabel, Select, MenuItem, TextField, Stack, Container, Paper,} from '@mui/material';

const Carrinho = () => {
  const {
    carrinho,
    nome,
    setNome,
    adicionarHistorico,
    enviarParaCozinha,
    valorTotal,
    limparCarrinho,
    removerDoCarrinho,
    entrega,
    setEntrega,
    mesa,
    setMesa,
    endereco,
    setEndereco,
  } = useCarrinho();
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
      data: new Date().toLocaleString(),
    };

    adicionarHistorico(pedido);
    enviarParaCozinha(pedido);
    navigate('/Cozinha');
  };

  if (carrinho.length === 0) {
    return (
      <Container
        component="section"
        maxWidth={false}
        sx={{
          backgroundImage: 'url("/logo/fundo.jpeg")',
          minHeight: '100vh',
          minWidth: '100%',
          display: 'flex',          
          justifyContent: 'center', 
          alignItems: 'center',   
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            color: 'rgb(123, 56, 8)',
            bgcolor: '#b95c10',
            p: 3,
            borderRadius: 3,
            border: '2px solid #291c0f',
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              bgcolor: '#dca91e',
              color: 'rgb(254, 246, 241)',
              borderRadius: 3,
              py: 1,
              px: 2,
              mb: 2,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              WebkitTextStroke: '2px rgb(66, 26, 14)',
              fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
            }}
          >
            Seu carrinho está vazio :(
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              color: 'rgb(251, 245, 240)',
              WebkitTextStroke: '1.5px rgb(44, 15, 117)',
              fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
              fontSize: '2rem',   
            }}
          >
            Por que você não dá uma olhada no nosso cardápio e faz um pedido?
          </Typography>

          <Box
            component="img"
            src="/images/empty_cart.gif"
            alt="Carrinho vazio"
            sx={{ width: 200, mb: 3 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/Cardapio')}>
              Ir ao Cardápio
            </Button>
          </Box>
        </Box>
      </Container>

    );
  }

  return (
    <Container component="section" maxWidth={false} sx = {{ backgroundImage: 'url("/logo/fundo.jpeg")', minHeight: '100vh', minWidth: '100%'}}>
      <Container component="main" sx={{
              minHeight: '100vh',
              maxHeight: 'xxs',
              width: '40%',
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
            }}>
    <Paper elevation={3} sx={{ backgroundColor:'#fbf8c8ff', paddingBottom:'30px', mx: 'auto', mt: 4, px: 2, paddingTop: '25px'}}>
      <Typography
        variant="h3"
        sx={{
          bgcolor: '#b32900',
          color: 'rgb(253, 249, 246)',
          borderRadius: 3,
          py: 1,
          px: 3,
          mb: 4,
          border: '3px solid #330a04',
          fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
          WebkitTextStroke: '2px #330a04',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        Carrinho
      </Typography>

      <Stack spacing={3}>
        {carrinho.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              bgcolor: '#6c1305',
              borderRadius: 3,
              p: 2,
              border: '3px solid #330a04',
              boxShadow: '0 0 5px rgba(0,0,0,0.1)',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Box
              component="img"
              src={item.image}
              alt={item.title}
              sx={{
                width: 300,
                height: 'auto',
                borderRadius: 1,
                objectFit: 'cover',
              }}
            />
            <Box sx={{ flexGrow: 1, pl: 4 }}>
              <Typography variant="h5" sx={{ color: '#efac41', mb: 1, fontWeight: 'bold' }}>
                {item.title}
              </Typography>
              <Typography sx={{ color: '#fffef6' }}>Preço: R$ {item.preco}</Typography>
              <Typography sx={{ color: '#fffef6' }}>Quantidade: {item.quantidade}</Typography>
              <Typography sx={{ color: '#fffef6' }}>Tamanho: {item.tamanho}</Typography>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={() => removerDoCarrinho(item.id)}
              >
                Remover
              </Button>
            </Box>
          </Box>
        ))}

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: 'black',
              WebkitTextStroke: '1px black',
            }}
          >
            Total: R$ {valorTotal}
          </Typography>
        </Box>

        <Box>
          <Box sx = {{bgcolor: '#b32900',  borderRadius: 3,  border: '3px solid #330a04'}}>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 1)',
              fontWeight: 'bold',
              textAlign: 'center',
              py: 1,
              px: 1,
              mb: 1,
              WebkitTextStroke: '1px rgb(66, 26, 14)',
              fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
            }}
          >
            Informe se é para entrega em casa ou mesa
          </Typography>
        </Box>
          <RadioGroup
            row
            value={entrega}
            onChange={(e) => setEntrega(e.target.value)}
            sx={{ justifyContent: 'center', mb: 3 }}
          >
            <FormControlLabel  sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '30px', color: 'black'
                },
              }} value="mesa" control={<Radio />} label="Mesa" />
            <FormControlLabel  sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '30px', color: 'black'
              },
            }}value="casa" control={<Radio />} label="Entrega" />
          </RadioGroup>

          {entrega === 'mesa' && (
            <Box sx={{ maxWidth: 300, mx: 'auto' }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#000000ff',
                  mb: 1,
                  fontSize: '30px',
                  WebkitTextStroke: '1px black',
                }}
              >
                Informe o número da mesa:
              </Typography>
              <Select fullWidth value={mesa} onChange={handleChangeMesa}>
                <MenuItem value="301">301</MenuItem>
                <MenuItem value="125">125</MenuItem>
                <MenuItem value="174">174</MenuItem>
                <MenuItem value="101">101</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="239">239</MenuItem>
                <MenuItem value="57">57</MenuItem>
              </Select>
            </Box>
          )}

          {entrega === 'casa' && (
            <Stack spacing={2} sx={{ maxWidth: 400, mx: 'auto' }}>
              <TextField
                label="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Digite seu endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </Stack>
          )}
        </Box>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleEnviarParaCozinha();
              navigate('/Pagamento');
            }}
          >
            Enviar para a Cozinha
          </Button>
          <Button variant="contained" color="error" onClick={limparCarrinho}>
            Limpar Carrinho
          </Button>
          <Button variant="contained" color="warning" onClick={() => navigate('/Cardapio')}>
            Continuar Comprando
          </Button>
        </Stack>
      </Stack>
    </Paper>
    </Container>
    </Container>
  );
};

export default Carrinho;
