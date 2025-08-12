import React from 'react'
import PizzaCard from '../components/PizzaCard'
import Header from '../components/Header'
import { useState } from 'react'
import { useProdutos } from "../context/ProdutosContext";
import Footer from '../components/Footer'

import { Container, Box, Button, Typography, Paper, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Cardapio = () => {
  const {produtos, ingredientes, categorias} = useProdutos();

  const [mostrarFiltrosIng, setMostrarFiltrosIng] = useState(false);
  const [mostrarFiltrosTipos, setMostrarFiltrosTipos] = useState(false);
  const [ingredienteSelecionado, setIngredienteSelecionado] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");

  //Pizzas filtradas por ingredientes (que estão no produtosContext)
  const pizzasFiltradas = ingredienteSelecionado
    ? produtos.filter(pizza =>
        pizza.ingredients[0]
        .toLowerCase()
          .includes(ingredienteSelecionado.toLowerCase())
      )
    : produtos;

  //Produtos filtradas por tipos
  const tiposFiltrados = tipoSelecionado
    ? produtos.filter(produto=> produto.subcategory == tipoSelecionado)
    : produtos;

  const pizzasSalgadas = produtos.filter(p => p.category === "pizza" && p.subcategory === "salgada");
  const pizzasDoces = produtos.filter(p => p.category === "pizza" && p.subcategory === "doce");
  const bebidasRefri = produtos.filter(p => p.category === "bebida" && p.subcategory === "refrigerante");
  const bebidasVinho = produtos.filter(p => p.category === "bebida" && p.subcategory === "vinho");
  const bebidasAgua = produtos.filter(p => p.category === "bebida" && p.subcategory === "água");

  return (
    <Box sx={{ backgroundImage: 'url("images/madeira.jpg")', minHeight: '100vh' }}>
      <Header />
      {/* Principal aqui */}
      <Container maxWidth="90%" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, pt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size='large'
            sx={{
              backgroundColor: '#b32900',
              '&:hover': {
                backgroundColor: '#6c1305',
              },
            }}
            onClick={() => {
              setMostrarFiltrosIng(!mostrarFiltrosIng)
              if (mostrarFiltrosIng) {
                setIngredienteSelecionado('');
              }
            }}
          >
            {mostrarFiltrosIng ? 'Ocultar Filtros' : 'Filtrar por ingrediente'}
          </Button>

          <Button
            variant="contained"
            color="primary"
            size='large'
            sx={{
              backgroundColor: '#b32900',
              '&:hover': {
                backgroundColor: '#6c1305',
              },
            }}
            onClick={ () => { setMostrarFiltrosTipos(!mostrarFiltrosTipos);
              // Lógica de reset: se o filtro estiver sendo ocultado, reseta o valor
              if (mostrarFiltrosTipos) {
                setTipoSelecionado('');
              }
            }}
          >
            {mostrarFiltrosTipos ? 'Ocultar Filtros' : 'Filtrar por tipo'}
          </Button>
        </Box>

        {mostrarFiltrosIng && (
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" color="text.primary">Selecione um ingrediente:</Typography>
            <FormControl sx={{ minWidth: 300, mt: 1 }}>
              <InputLabel id="ingrediente-label" >Ingrediente</InputLabel>
              <Select
                labelId="ingrediente-label"
                value={ingredienteSelecionado}
                label="Ingrediente"
                variant='filled'
                sx = {{backgroundColor: '#b32a00c3',}}
                onChange={(e) => setIngredienteSelecionado(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                {ingredientes.map((ing, index) => (
                  <MenuItem key={index} value={ing}>
                    {ing}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {mostrarFiltrosTipos && (
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" color="text.primary">Selecione um tipo de produto:</Typography>
            <FormControl sx={{ minWidth: 300, mt: 1 }}>
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                value={tipoSelecionado}
                label="Tipo"
                sx = {{backgroundColor: '#b32a00c3'}}
                onChange={(e) => setTipoSelecionado(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                {categorias.map((tipo, index) => (
                  <MenuItem key={index} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
        
        {ingredienteSelecionado && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                textAlign: 'center',
                color: 'rgb(245, 234, 227)',
                backgroundColor: '#ffa221',
                padding: '10px',
                borderRadius: '30px',
                fontWeight: 'bold',
                textShadow: '1px 1px #421a0e'
              }}
            >
              Pizzas filtradas
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {pizzasFiltradas.map(pizza => (
                <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                  <PizzaCard pizza={pizza} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {tipoSelecionado && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                textAlign: 'center',
                color: 'rgb(245, 234, 227)',
                backgroundColor: '#ffa221',
                padding: '10px',
                borderRadius: '30px',
                fontWeight: 'bold',
                textShadow: '1px 1px #421a0e'
              }}
            >
              Tipos filtrados
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2, alignItems: 'center', justifyContent: 'center'  }}>
              {tiposFiltrados.map(tipo => (
                <Grid item xs={12} sm={6} md={4} key={tipo.id}>
                  <PizzaCard pizza={tipo} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        
        {/* Pizza aqui */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h3" component="h1" sx={{
            border: '2px solid #4f2b09',
            color: 'rgb(245, 234, 227)',
            padding: '10px',
            textAlign: 'center',
            backgroundColor: '#92041eff',
            textShadow: '2px 2px #421a0e',
            borderRadius: '5px'
          }}>
            Pizzas
          </Typography>

          <Box sx={{ display: 'flex', gap: '2rem', justifyContent: 'center', my: 4 }}>
            <Paper sx={{ p: 2, textAlign: 'center', minWidth: 100, backgroundColor: '#b32900', border: '1px solid #4f2b09',}}>
              <Typography variant="h5" sx={{color: 'white'}} >Pequena</Typography>
              <Typography variant="body1" sx={{ mt: 1, textDecoration: 'underline', color: 'white' }}>R$ 77,99</Typography>
            </Paper>
            <Paper sx={{ p: 2, textAlign: 'center', minWidth: 100, backgroundColor: '#b32900', border: '1px solid #4f2b09', }}>
              <Typography variant="h5" sx={{color: 'white'}}>Média</Typography>
              <Typography variant="body1" sx={{ mt: 1, textDecoration: 'underline', color: 'white'  }}>R$ 99,99</Typography>
            </Paper>
            <Paper sx={{ p: 2, textAlign: 'center', minWidth: 100, backgroundColor: '#b32900', border: '1px solid #4f2b09', }}>
              <Typography variant="h5" sx={{color: 'white'}}>Grande</Typography>
              <Typography variant="body1" sx={{ mt: 1, textDecoration: 'underline', color: 'white'  }}>R$ 110,99</Typography>
            </Paper>
            <Paper sx={{ p: 2, textAlign: 'center', minWidth: 100, backgroundColor: '#b32900', border: '1px solid #4f2b09', }}>
              <Typography variant="h5" sx={{color: 'white'}}>Família</Typography>
              <Typography variant="body1" sx={{ mt: 1, textDecoration: 'underline', color: 'white'  }}>R$ 130,99</Typography>
            </Paper>
          </Box>
        </Box>

        {/* Pizza salgadas */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h2" sx={{
            textAlign: 'center',
            color: 'rgb(248, 230, 220)',
            backgroundColor: '#ffb80e ',
            padding: '10px',
            borderRadius: '30px',
            textShadow: '1px 1px #421a0e',
             border: '1px solid #4f2b09'
          }}>
            Pizzas salgadas
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2, mb: 3, alignItems: 'center', justifyContent: 'center' }}>
            {pizzasSalgadas.map(pizza => (
              <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                <PizzaCard pizza={pizza} />
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h2" sx={{
            textAlign: 'center',
            color: 'rgb(248, 230, 220)',
            backgroundColor: '#ffb80e ',
            padding: '10px',
            border: '1px solid #4f2b09',
            borderRadius: '30px',
            textShadow: '1px 1px #421a0e'
          }}>
            Pizzas doces
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2, mb: 3, alignItems: 'center', justifyContent: 'center' }}>
            {pizzasDoces.map(pizza => (
              <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                <PizzaCard pizza={pizza} />
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h3" component="h1" sx={{
            border: '2px solid #4f2b09',
            color: 'rgb(245, 234, 227)',
            padding: '10px',
            textAlign: 'center',
            border: '1px solid #4f2b09',
            backgroundColor: '#92041eff',
            textShadow: '2px 2px #421a0e',
            borderRadius: '5px'
          }}>
            Bebidas
          </Typography>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h2" sx={{
            textAlign: 'center',
            color: 'rgb(248, 230, 220)',
            backgroundColor: '#ffb80e ',
            padding: '10px',
            borderRadius: '30px',
            border: '1px solid #4f2b09',
            textShadow: '1px 1px #421a0e'
          }}>
            Água
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2, mb: 3, alignItems: 'center', justifyContent: 'center' }}>
            {bebidasAgua.map(pizza => (
              <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                <PizzaCard pizza={pizza} />
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h2" sx={{
            textAlign: 'center',
            color: 'rgb(248, 230, 220)',
            backgroundColor: '#ffb80e ',
            padding: '10px',
            borderRadius: '30px',
            border: '1px solid #4f2b09',
            textShadow: '1px 1px #421a0e'
          }}>
            Refrigerante
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2, mb: 3, alignItems: 'center', justifyContent: 'center' }}>
            {bebidasRefri.map(pizza => (
              <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                <PizzaCard pizza={pizza} />
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h2" sx={{
            textAlign: 'center',
            color: 'rgb(248, 230, 220)',
            backgroundColor: '#ffb80e ',
            padding: '10px',
            borderRadius: '30px',
            border: '1px solid #4f2b09',
            textShadow: '1px 1px #421a0e'
          }}>
            Vinho
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2, mb: 3, alignItems: 'center', justifyContent: 'center' }}>
            {bebidasVinho.map(pizza => (
              <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                <PizzaCard pizza={pizza} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}

export default Cardapio
