import React from 'react';
import { Box, Typography } from '@mui/material';
import { useHistorico } from '../context/PedidosContext';

const Historico = () => {
  const { totalPedidos } = useHistorico();

  if (totalPedidos.length === 0) {
    return (
      <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
        O histórico está vazio!!!
      </Typography>
    );
  }



  return (
        <h1> :3 </h1>
  );
};

export default Historico;
