import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Container, Icon } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result) {
      // O usuário está no contexto após login
      if (result.role === 'admin') {
        navigate('/admin');
      } else if (result.role === 'cozinha') {
        navigate('/Cozinha');
      }else if(result.role === 'entregas') {
        navigate('/Entregas');

      }
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  return (
    <Container component="section" maxWidth="100%" sx={{
      backgroundImage: 'url(/images/madeira.jpg)',
    }}>
      <Container component="main" maxWidth="xs" sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',  
      }}>

        <Paper elevation={3} sx={{ padding: 4, width: '100%'}}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate('/')}
          >
            Retornar 
          </Button>

          <Typography component="h1" variant="h5" align="center" marginTop={5}>
            Login
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1, mb: 3 }}>
            Faça login para acessar o sistema
          </Typography>
          
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuário"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='primary'
            >
              Entrar
            </Button>
          </Box>
        </Paper>

    </Container>
    </Container>

  )
}


export default Login;