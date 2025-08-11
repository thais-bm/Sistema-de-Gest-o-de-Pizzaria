import React from 'react';
import { useCarrinho } from '../context/CarrinhoContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
  Paper,
  Typography,
  Button,
  Box,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';

const notify = () => toast.success('Compra realizada com sucesso!');

const Pagamento = () => {
  const { valorTotal, limparCarrinho } = useCarrinho();
  const navigate = useNavigate();

  const [metodoPagamento, setMetodoPagamento] = React.useState(null);

  const handleFinalizarCompra = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!metodoPagamento) {
      alert('Por favor, selecione um método de pagamento!');
      return;
    }
    limparCarrinho();
    notify();
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const formularioCartao = ({ comParcelamento }) => {
    const opcoesParcelamento = () => {
      const parcelas = [];
      for (let i = 1; i <= 6; i++) {
        const valorParcela = (valorTotal / i).toFixed(2);
        parcelas.push(
          <MenuItem key={i} value={i}>
            {i}x de R$ {valorParcela} {i > 1 ? 'sem juros' : ''}
          </MenuItem>
        );
      }
      return parcelas;
    };

    return (
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: 'auto', mt: 4 }}>
        <Typography variant="h5" component="h4" align="center" gutterBottom>
          Pagamento com Cartão
        </Typography>
        <Typography variant="body1" align="center">
          Insira os dados do seu cartão abaixo:
        </Typography>
        <Typography variant="caption" align="center" display="block">
          Você pode encontrar os dados no seu cartão igual no exemplo abaixo
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <img src="/images/exemplo-cartao.png" alt="Exemplo de Cartão" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>

        <Box component="form" onSubmit={handleFinalizarCompra} sx={{ mt: 3 }}>
          <TextField fullWidth margin="normal" label="Nome no Cartão" placeholder="Ex.: Fulano de Tal" required />
          <TextField
            fullWidth
            margin="normal"
            label="Número do Cartão"
            placeholder="Ex.: 1234 5678 9101 1121"
            inputProps={{ maxLength: 16 }}
            required
            inputMode="numeric"
          />

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item>
              <TextField fullWidth label="Validade" placeholder="MM/AA" required maxLength="5" />
            </Grid>
            <Grid item>
              <TextField fullWidth label="CVV" placeholder="Ex.: 123" required maxLength="3" inputMode="numeric" />
            </Grid>
          </Grid>

          {comParcelamento && (
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="parcelamento-label">Número de Parcelas</InputLabel>
              <Select labelId="parcelamento-label" label="Número de Parcelas" defaultValue="">
                <MenuItem value="" disabled>
                  Selecione o número de parcelas
                </MenuItem>
                {opcoesParcelamento()}
              </Select>
            </FormControl>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 2 }}>
            Pagar Agora
          </Button>
        </Box>
      </Paper>
    );
  };

  const formularioPix = () => {
    return (
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4, width: '100%', maxWidth: 'sm' }}>
        <Typography variant="h5" component="h4" align="center" gutterBottom>
          Pague com Pix
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Escaneie o QR Code abaixo com o app do seu banco:
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://youtu.be/sNF2Y8dvPNs?si=3s3hTLHiFXjplRtW`}
            alt="QR Code para pagamento via Pix"
            style={{ maxWidth: 200, height: 'auto' }}
          />
        </Box>
        <Typography variant="body1" align="center" paragraph>
          Ou copie a chave Pix abaixo:
        </Typography>
        <TextField
          fullWidth
          id="chave-pix"
          label="Chave Pix"
          value={`https://youtu.be/sNF2Y8dvPNs?si=3s3hTLHiFXjplRtW`}
          InputProps={{ readOnly: true }}
          margin="normal"
        />
        <Button onClick={handleFinalizarCompra} variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 2 }}>
          Confirmar Pagamento
        </Button>
      </Paper>
    );
  };

  return (
    <Container
      component="section"
      maxWidth="100%"
      sx={{
        backgroundImage: 'url(/images/madeira.jpg)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: 'auto', mt: 4 }}>
        <Typography component="h1" variant="h5" align="center" color="primary">
          Finalizar Compra
        </Typography>

        <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />

        <Box sx={{ marginTop: 3 }}>
          <Typography variant="body1" color="primary">
            Resumo do Pedido
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
            <Typography variant="h6" color="initial">
              Valor total: R$ {valorTotal}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1" color="initial" align="center">
            Escolha uma Forma de Pagamento
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, gap: 2 }}>
          <Button variant="contained" color="primary" onClick={() => setMetodoPagamento('pix')}>
            Pix
          </Button>
          <Button variant="contained" color="primary" onClick={() => setMetodoPagamento('credito')}>
            Cartão de Crédito
          </Button>
          <Button variant="contained" color="primary" onClick={() => setMetodoPagamento('debito')}>
            Cartão de Débito
          </Button>
        </Box>
      </Paper>

      {metodoPagamento === 'pix' && formularioPix()}
      {metodoPagamento === 'credito' && formularioCartao({ comParcelamento: true })}
      {metodoPagamento === 'debito' && formularioCartao({ comParcelamento: false })}
    </Container>
  );
};

export default Pagamento;