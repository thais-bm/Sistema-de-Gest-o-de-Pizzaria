import React from 'react'
import { useState } from 'react';
import '../components/PizzaCard.css'
import { toast,  ToastContainer } from 'react-toastify';
import { Paper, Box, Typography, TextField, Select, MenuItem, Button, Card ,Grid, Container} from '@mui/material';
import { ProdutosProvider, useProdutos } from '../context/ProdutosContext';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Tooltip from '@mui/material/Tooltip'; 



const Promoção = () => {

    const { precosPizza } = useProdutos();

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

        </Container>
    )
}

export default Promoção;