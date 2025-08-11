import React, {useState} from 'react'
import '../components/PizzaCard.css'
import { useProdutos } from "../context/ProdutosContext";
import { useNavigate } from 'react-router-dom';
import { Container, Card, Box, CardContent, Button, Typography, Paper, Collapse } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material';
import { set } from 'react-hook-form';
import { PedidosProvider, useHistorico } from '../context/PedidosContext';

import AddProduto from '../components/AddProduto';

// eu vou transformar em um menu dropdown pra aparecer na propria pagina de Admin
const gerenciarDropdown = () => {

};

const historicoDropdown = () => {

};


// aqui fica as mudanças que eu estou fazendo no menu de Admin
const NovoMenu = () => {
  const [gerenciarIconUp, setGerenciarIconUp] = useState(true);
  const [historicoIconUp, setHistoricoIconUp] = useState(true);
  const [showAddProduto, setShowAddProduto] = useState(false);
  const [showHistorico, setShowHistorico] = useState(false);

  const {totalPedidos, setTotalPedidos, adicionarAoHistorico, removerDoHistorico, limparHistorico} = useHistorico();

  const handleGerenciarProduto = () => {
    setGerenciarIconUp(!gerenciarIconUp);
    setShowAddProduto(!showAddProduto);
  };

  const handleHistoricoPedidos = () => {
    setHistoricoIconUp(!historicoIconUp);
  }
  return (
    <Container component="section" maxWidth="100%" sx={{
          backgroundImage: 'url(/images/madeira.jpg)',   
    }}>

      <Container maxWidth="xs" component="main" sx={{
        minHeight: '100vh',
        maxHeight: 'xs',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
      }}>

      {/* Paper: um container "elevado" */}

        <Paper elevation={3} sx={{ padding: 4, width: '100%'}}>
          <Typography component="h1" variant="h5" align="center" color="primary">Bem-vindo ao painel de Adminstração</Typography>
          <Typography variant="h6" color="primary" padding="10px">O que deseja fazer?</Typography> 

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, marginTop: 3 }}>
            <Button variant="outlined" color="primary" startIcon={gerenciarIconUp ? <KeyboardArrowUp /> : <KeyboardArrowDown />} onClick={handleGerenciarProduto}>
              Gerenciar Produto
            </Button>
            <Collapse in={showAddProduto} sx={{ width: '100%', mt: 2 }}>
              {showAddProduto && (
                <AddProduto onCancel={() => setShowAddProduto(false)} />
              )}
            </Collapse>
            <Button variant="outlined" color="primary" startIcon={historicoIconUp ? <KeyboardArrowUp /> : <KeyboardArrowDown />} onClick={handleHistoricoPedidos}>
              Histórico de Pedidos
            </Button>
            <Collapse in={showHistorico} sx={{ width: '100%', mt: 2 }}>
              {showHistorico && totalPedidos.length === 0 (
                <Typography variant="h2"> O histórico está vazio!!! </Typography>
              )}
              
            </Collapse>
          </Box>
        </Paper>
      </Container>
    </Container>
    
  )
}

const oldMenu = () => {
  const navigate = useNavigate();
  const {produtos, removerProduto, atualizarProduto} = useProdutos();

  return (
    <Container>
      <Card>
        <Button onClick={() => navigate('/Adicionar')}> Adicionar produto</Button>
      </Card>

      <Card >
        {produtos.map(produto => (
          <div className="card">
            <div className="tilt">
            <div className="img">
              <img src={produto.image}/>
            </div>
          </div>
          <div className="info">
            <div className="cat">{produto.ingredients}</div>
            <h2 className="title">{produto.title}</h2>
            <p className="desc"> </p>
            <div className="feats">
            <span className="feat">{produto.category}</span>
            <span className="feat">{produto.subcategory}</span>
            <span className="feat"></span>
            </div>
            <div className="bottom">
            {produto.price && (
                <div className="price">
                  <span className="new">R$ {produto.price}</span>
                </div>
            )}
            <button className="btn" onClick={() => atualizarProduto}>
                <span > Alterar informações </span>
            </button>
        
            <Button color="error" className='button-29'onClick={() => removerProduto(produto.id)}> Excluir Produto </Button>
            </div>
              </div>
            </div>
        ))}

        
      </Card>
    </Container>
  );
};


const Admin = () => {



  // return NovoMenu(); // Use NovoMenu() para o novo design ou oldMenu() para o antigo
  return NovoMenu(); // Use oldMenu() para o antigo design

  

   
 
}

export default Admin;

/*

<Container>

      <Card>
        <Button onClick={() => navigate('/Adicionar')}> Adicionar produto</Button>
      </Card>

      <Card >
        {produtos.map(produto => (
          <div className="card">
            <div className="tilt">
            <div className="img">
              <img src={produto.image}/>
            </div>
          </div>
          <div className="info">
            <div className="cat">{produto.ingredients}</div>
            <h2 className="title">{produto.title}</h2>
            <p className="desc"> </p>
            <div className="feats">
            <span className="feat">{produto.category}</span>
            <span className="feat">{produto.subcategory}</span>
            <span className="feat"></span>
            </div>
            <div className="bottom">
            {produto.price && (
                <div className="price">
                  <span className="new">R$ {produto.price}</span>
                </div>
            )}
            <button className="btn" onClick={() => atualizarProduto}>
                <span > Alterar informações </span>
            </button>
        
            <Button color="error" className='button-29'onClick={() => removerProduto(produto.id)}> Excluir Produto </Button>
            </div>
              </div>
            </div>
        ))}

        
      </Card>
    </Container>

*/