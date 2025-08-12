import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const navigate = useNavigate();

  const handleCarrinhoClick = () => {
    navigate('/Carrinho');
  };

  const handleAcessoRestritoClick = () => {
    navigate('/login');
  };

  return (
    <AppBar position="relative"  sx={{
      height: 170,
      backgroundImage: 'url("/logo/fundo.jpeg")',
      backgroundPosition: 'center',
    }}>

    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Logo */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <img
          src="/logo/freddy_pizza.png"
          alt="Logo Freddy's Pizzaria"
          style={{ height: 160, width: 'auto' }}
        />
      </Box>

    {/* Título*/}
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 'bold',
          userSelect: 'none',
          fontSize: '68px',
          textAlign: 'center',
        }}
      >
        Freddy's Pizzaria
      </Typography>
    </Box>

      {/* Botões de Navegação */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
        <IconButton
            onClick={handleCarrinhoClick}
            color="inherit"
            aria-label="Carrinho"
            size="large"
            sx={{
              '&:hover': {
                backgroundColor: 'primary.main', 
                transition: 'background-color 0.3s',
              },
            }}
          >
            <ShoppingCartIcon sx = {{fontSize: '50px'}} />
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
            <LockIcon sx = {{fontSize: '50px'}}  />
          </IconButton>
      </Box>
    </Toolbar>

    </AppBar>
  );
};

export default Header;
