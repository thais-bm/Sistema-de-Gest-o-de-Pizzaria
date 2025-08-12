// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({

  palette: {
    primary: {
      main: '#92041eff', // Cor primária personalizada
    },
    secondary: {
      main: '#ffa221', 
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
  },
  // Você pode personalizar outras coisas aqui, como tipografia
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;