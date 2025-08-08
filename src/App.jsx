import { useState, useEffect } from 'react'
import axios from "axios"
import './App.css'
import Cardapio from './pages/Cardapio';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [erro, setErro] = useState(null);
  const [produtos, setProdutos] = useState([]);


  useEffect(() => {
    const carregarProdutos = async () => {
      try{
        const response = await axios.get("/api/produtos.json");
        setProdutos(response.data);
      }catch(error){
        console.error("Erro ao carregar produtos:",error);
        setErro("Falha ao carrrgar as pizzas. Aff")
      }
    };
    carregarProdutos();
  },[]);


  return (
   <main>
    <Routes>
      <Route element={<Cardapio produtos={produtos}/>} path="/"/>
    </Routes>
   </main>
  )
}

export default App
