import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Cardapio from '../pages/Cardapio';
import PizzaOrder from '../components/PizzaOrder';
import Carrinho from '../pages/Carrinho';
import Cozinha from '../pages/Cozinha';
import NotFound from '../pages/NotFound';
import Admin from '../pages/Admin';
import ProtectedRoute from '../routes/ProtectedRoute';
import Pagamento from '../pages/Pagamento';
import Login from '../pages/Login';
import Entregas from '../pages/Entregas.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route element={<Cardapio />} path="/" />
      <Route element={<Cardapio />} path="/Cardapio" />
      <Route element={<PizzaOrder />} path="/PizzaOrder" />
      <Route element={<Carrinho />} path="/Carrinho" />
      <Route element={<Cozinha />} path="/Cozinha" />
      <Route element={<NotFound />} path="*" /> 
      <Route element={<Pagamento/>} path="/Pagamento"/>
      <Route element={<Login />} path="/login" />
          
      {/* Rotas Privadas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Cozinha />} path="/cozinha" />
        <Route element={<Admin />} path="/admin" />
        <Route element={<Entregas />} path="/Entregas" />
      </Route>
    </Routes>
  );
};

export default AppRoutes;