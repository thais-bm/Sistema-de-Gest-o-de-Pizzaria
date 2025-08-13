import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCarrinho } from '../context/CarrinhoContext';
import { useProdutos } from '../context/ProdutosContext';

import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Button,
  TextField,
  IconButton,
} from '@mui/material';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const PizzaOrder = () => {
  const location = useLocation();
  const pizza = location.state?.pizza;
  const navigate = useNavigate();

  const { adicionarAoCarrinho } = useCarrinho();
  const { precosPizza } = useProdutos();

  const [tamanho, setTamanho] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [observacao, setObservacao] = useState('');

  const handleCarrinhoClick = () => {
    if (pizza.category === 'pizza' && !tamanho) {
      toast.error('Por favor, selecione o tamanho da pizza!');
      return;
    }

    const tamanhoSelecionado = precosPizza.find((p) => p.id === tamanho);
    const precoFinal = tamanhoSelecionado ? tamanhoSelecionado.preco : pizza.price;
    const nomeTamanho = tamanhoSelecionado ? tamanhoSelecionado.nome : null;

    const itemParaAdicionar = {
      ...pizza,
      id: `${pizza.id}-${tamanho || ''}-${Date.now()}`,
      tamanho: nomeTamanho,
      quantidade,
      observacao,
      preco: precoFinal,
    };

    adicionarAoCarrinho(itemParaAdicionar);
    toast.success('Item adicionado ao carrinho!', {
      onClose: () => navigate('/Carrinho'),
    });
  };

  const aumentarQuantidade = () => setQuantidade((prev) => prev + 1);
  const diminuirQuantidade = () => setQuantidade((prev) => (prev > 1 ? prev - 1 : 1));

  if (!pizza) return <Typography>Pizza não encontrada.</Typography>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },

        minHeight: '1200px',
        justifyContent: 'center', 
        backgroundImage: 'url(/images/madeira.jpg)',
      }}
    >
      {/* Imagem da pizza */}
      <Box
        component="img"
        src={pizza.image}
        alt={pizza.title}
        sx={{ width: { md: 600 }, marginTop: '200px',height: { md: 600},  borderRadius: 100 }}
      />

      {/* Box com info da pizza */}
      <Box sx={{height: '1150px', ml: '200px', mt:'20px', width: '800px', bgcolor: 'rgba(255,255,255,0.9)', p: 3, borderRadius: 2 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontSize: '4rem',
            textAlign: 'center',
            paddingTop: '1.5rem',
            fontWeight: 'bold', 
            textTransform: 'uppercase',
            color: '#ffca0c',
            WebkitTextStroke: '3px #330a04',
            margin: 0,
            fontFamily: 'Impact, Charcoal, sans-serif', 
          }}
        >
          {pizza.title}
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            textAlign: 'center',
            paddingTop: '1.5rem',
            fontFamily: 'Impact, Charcoal, sans-serif',
            textTransform: 'uppercase',
            color: '#b81818ff',
            WebkitTextStroke: '1px #330a04',
            margin: 0,
            fontSize: '1.6rem',
            fontStyle: 'italic',
          }}
        >
          {pizza.ingredients}
        </Typography>

          <Typography
              variant="subtitle1"
              sx={{
                border: '2px solid #330a04',
                fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                color: 'rgb(253, 251, 250)',
                padding: '8px',
                margin: '20px',
                textAlign: 'center',
                backgroundColor: '#b32900',
                WebkitTextStroke: '0.8px rgb(66, 26, 14)',
                borderRadius: '5px',
                fontWeight: 'bold',
                fontSize: 20,
                
              }}>
                Selecione o tamanho da pizza:
            </Typography>

        {pizza.category === 'pizza' && (
          <FormControl component="fieldset" sx={{ mt: 3 }}>
            <RadioGroup
              aria-label="tamanho"
              name="tamanho"
              value={tamanho}
              
              onChange={(e) => setTamanho(e.target.value)}
            >
              {precosPizza.map((precoInfo) => (
                <FormControlLabel
                  key={precoInfo.id}
                  value={precoInfo.id}
                  control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
                  label={`Pizza ${precoInfo.nome} (R$${precoInfo.preco})`}
                  sx={{ fontSize: 25, fontWeight: 'bold', mb: 1 }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}

        {/* Controle de quantidade */}
        <Box sx={{ mt: 4 }}>
          <Typography
              variant="subtitle1"
              sx={{
                border: '2px solid #330a04',
                fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                color: 'rgb(253, 251, 250)',
                padding: '8px',
                margin: '20px',
                textAlign: 'center',
                backgroundColor: '#b32900',
                WebkitTextStroke: '0.8px rgb(66, 26, 14)',
                borderRadius: '5px',
                fontWeight: 'bold',
                fontSize: 20,
                
              }}>
                Selecione o tamanho da pizza:
            </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              aria-label="diminuir quantidade"
              onClick={diminuirQuantidade}
              size="large"
            >
              <RemoveIcon fontSize="inherit" />
            </IconButton>
            <Typography variant="h5">{quantidade}</Typography>
            <IconButton aria-label="aumentar quantidade" onClick={aumentarQuantidade} size="large">
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>

        {/* Observações */}
        <Box
            sx={{
              mt: 4,
              position: 'relative',
              padding: '2em',
              width: 300,
              minHeight: 100,
              backgroundColor: '#FFFD75',
              transition: 'transform 0.15s',
              margin: 0,
              '&:hover': {
                cursor: 'move',
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Alguma observação?
            </Typography>
            <TextField
              multiline
              rows={5}
              fullWidth
              placeholder="Ex: Tirar cebola, tirar azeitonas..."
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              variant="outlined"
              sx={{
                '& textarea': {
                  backgroundColor: 'transparent',
                  border: 'none',
                  resize: 'vertical',
                  fontFamily: '"Gloria Hallelujah", cursive',
                  width: '100%',

                  '&:focus': {
                    outline: 'none',
                    border: 'none',
                  },
                  minHeight: 50,
                },
              }}
            />
          </Box>

        {/* Botão adicionar ao carrinho */}
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" size="large" onClick={handleCarrinhoClick}>
            Adicionar ao Carrinho
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PizzaOrder;
