import React from 'react'
import { useState, useEffect} from 'react';
import '../components/PizzaCard.css'
import { toast,  ToastContainer } from 'react-toastify';
import { Paper,Stack, Box, Typography, TextField, Select, MenuItem, Button, Card ,Grid, Container} from '@mui/material';
import { ProdutosProvider, useProdutos } from '../context/ProdutosContext';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Tooltip from '@mui/material/Tooltip'; 



const Promoção = () => {
    const { precosPizza } = useProdutos();

    const [hours, setHours] = useState(0);

    const [promocaoSelecionada, setPromocaoSelecionada] = useState("");
    const [tempoPromocao, setTempoPromocao] = useState("");

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };


    return (
        <Container>
            <Typography variant='h3' sx={{textAlign:'center'}}> Preços das pizzas </Typography>
            <Box sx={{ my: 4, px: 2 }}>
                <Grid container spacing={3} justifyContent="center">
                {precosPizza.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{ mt: 2, p: 2 }}>
                        <h3>Alterar Informações</h3>
                        <TextField name="title" label="Título" value={item.nome} fullWidth sx={{ mb: 2 }} />
                        <TextField name="preço" label="Preço" value= {item.preco} fullWidth sx={{ mb: 2 }} />
                    </Card>            
                    </Grid>
                ))}
                </Grid>
            </Box>

            <Box sx={{ my: 4, px: 2 }}>
                <Grid container spacing={3} justifyContent="center">
                    <Typography variant='h4'> Criar promoção temporária </Typography>
                    <Select
                        value={promocaoSelecionada}
                        onChange={(e) => setPromocaoSelecionada(e.target.value)}
                        displayEmpty
                        fullWidth
                    >
                        <MenuItem value="">Selecione tamanho...</MenuItem>
                        {precosPizza.map((produto) => (
                        <MenuItem key={produto.id} value={produto.id}>
                            {produto.nome}
                        </MenuItem>
                        ))}
                    </Select>


                    {promocaoSelecionada && (
                        <Stack spacing={2} sx={{ maxWidth: 400, mx: 'auto' }}>
                            <TextField
                                label="Tempo de promoção..."
                                value={tempoPromocao}
                                onChange={(e) => setTempoPromocao(e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="Preco de promoção.."
                                value={promocaoSelecionada.preco}
                                onChange={(e) => setPromocaoSelecionada(e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Stack>
                    )}

                </Grid>
            </Box>

        </Container>
    )
}

export default Promoção;