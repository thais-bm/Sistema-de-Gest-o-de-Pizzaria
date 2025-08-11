import React from 'react'
import '../components/PizzaCard.css'
import { useProdutos } from "../context/ProdutosContext";
import { Container, Card, Box, CardContent, Button } from '@mui/material';

const Admin = () => {

  const {produtos, adicionarProduto, removerProduto, atualizarProduto} = useProdutos();

  return (
    <Container>

      <Card>
        <Button onClick={() => adicionarProduto}> Adicionar produto</Button>
      </Card>

      <Card >
        {produtos.map(produto => (
          <>
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
            </>
        ))}

        
      </Card>
    </Container>
  )
}

export default Admin
