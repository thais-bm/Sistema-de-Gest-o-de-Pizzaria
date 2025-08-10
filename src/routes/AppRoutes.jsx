import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import Cardapio from '../pages/Cardapio';
import PizzaOrder from '../components/PizzaOrder';
import Carrinho from '../pages/Carrinho';
import Cozinha from '../pages/Cozinha';
import NotFound from '../pages/NotFound';
import { ProdutosProvider } from '../context/ProdutosContext';
import { CarrinhoProvider } from '../context/CarrinhoContext';
import Checkout from '../pages/Checkout';

const AppRoutes = () => {
  return (
    <ProdutosProvider>
      <CarrinhoProvider>
        {/* O ToastContainer pros alertas */}
        <ToastContainer
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme="light"
        />

        {/* As rotas */}
        <Routes>
          <Route element={<Cardapio />} path="/" />
          <Route element={<Cardapio />} path="/Cardapio" />
          <Route element={<PizzaOrder />} path="/PizzaOrder" />
          <Route element={<Carrinho />} path="/Carrinho" />
          <Route element={<Cozinha />} path="/Cozinha" />
          <Route element={<NotFound />} path="*" /> 
          <Route element={<Checkout/>} path="/Checkout"/>
        </Routes>
      </CarrinhoProvider>
    </ProdutosProvider>
  );
};

export default AppRoutes;