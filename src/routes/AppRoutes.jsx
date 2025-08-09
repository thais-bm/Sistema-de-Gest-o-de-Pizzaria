import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Cardapio from '../pages/Cardapio'
import PizzaOrder from '../components/PizzaOrder';
import Carrinho from '../pages/Carrinho';
import Cozinha from '../pages/Cozinha';
import NotFound from '../pages/NotFound';
import { ProdutosProvider } from '../context/ProdutosContext';
import { CarrinhoProvider } from '../context/CarrinhoContext';


const AppRoutes = () => {

    return(
        <ProdutosProvider>
          <CarrinhoProvider>
          <Routes>
            <Route element={<Cardapio />} path="/" />
            <Route element={<PizzaOrder />} path="/PizzaOrder" />
            <Route element={<Carrinho />} path="/Carrinho" />
            <Route element={<Cozinha />} path="/Cozinha" />
            <Route element={<NotFound />} path="/NotFound" />
          </Routes>
          </CarrinhoProvider>
        </ProdutosProvider>
    )
}

export default AppRoutes;