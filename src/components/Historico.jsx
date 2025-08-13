import React, { useState } from 'react';
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogContent, Typography, Button} from '@mui/material';
import { useCarrinho } from '../context/CarrinhoContext';

const Historico = () => {
  const { historicoPedidos, limparHistorico, removerDoHistorico} = useCarrinho();
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  const handleClickPedido = (pedido) => {
    setPedidoSelecionado(pedido);
  };

  const handleClose = () => {
    setPedidoSelecionado(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {historicoPedidos.length === 0 ? (
        <Typography variant="h6">Nenhum pedido no histórico :(  </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#6c1305' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cliente</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Data</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Valor Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historicoPedidos.map((pedido) => (
                <TableRow
                  key={pedido.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleClickPedido(pedido)}
                >
                  <TableCell>{pedido.id}</TableCell>
                  <TableCell>{pedido.nome}</TableCell>
                  <TableCell>{pedido.data}</TableCell>
                  <TableCell>R$ {pedido.valorTotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/*card mais detalhado*/}
      <Dialog open={!!pedidoSelecionado} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          {pedidoSelecionado && (
            <>
              <Typography variant="h5" gutterBottom>
                Pedido #{pedidoSelecionado.id}
              </Typography>
              <Typography><strong>Cliente:</strong> {pedidoSelecionado.nome}</Typography>
              <Typography><strong>Data:</strong> {pedidoSelecionado.data}</Typography>
              <Typography><strong>Entrega:</strong> {pedidoSelecionado.entrega}</Typography>

              <Typography sx={{ mt: 3, fontWeight: 'bold' }}>Itens:</Typography>

              {pedidoSelecionado.itens.map((item) => (
                <Typography key={item.id}>
                  {item.quantidade}x {item.title} - R$ {item.preco} ({item.tamanho})
                </Typography>
              ))}

              <Typography sx={{ mt: 3, fontWeight: 'bold' }}>
                Valor total: R$ {pedidoSelecionado.valorTotal}
              </Typography>

              <Typography><strong>Endereço:</strong> {pedidoSelecionado.endereco}</Typography>

              <Button
                onClick={handleClose}
                variant="contained"
                color="primary"
                sx={{ mt: 2, marginRight:'15px'}}
                
              >
                Fechar
              </Button>

               <Button
                onClick={() => {
                  removerDoHistorico(pedidoSelecionado.id);
                  handleClose();
                }}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Remover
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

       <Button
          onClick={() => {
          limparHistorico();
          handleClose();
        }}
          variant="contained"
          color="primary"
          sx={{ mt: 2, alignItems: 'center', alignSelf: 'center' }}
          
        >
          Limpar Histórico
      </Button>
    </Container>
  );
};

export default Historico;
