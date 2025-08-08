import { useState, useEffect } from 'react'
import axios from "axios"
import './App.css'
import Cardapio from './pages/Cardapio';
import { Routes, Route } from 'react-router-dom';
import PizzaOrder from './components/PizzaOrder';

function App() {
  const [erro, setErro] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [pizza, setPizza] = useState(null);

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

  //so pra testar o PizzaOrder dps eu coloco certinho
  useEffect(() => {
    fetch("api/produtos.json")
      .then(res => res.json())
      .then(data => {
        const pizza = data.find(p => p.id === 1);
        setPizza(pizza);
      })
      .catch(erro => console.error("Erro ao carregar pizza:", erro));
  }, []);

  if (!pizza) return <p>Não tem pizzar</p>;

  return (
   <main>
    <Routes>
      <Route element={<PizzaOrder pizza={pizza}/>} path="/PizzaOrder"/>
      <Route element={<Cardapio produtos={produtos}/>} path="/"/>
    </Routes>
   </main>
  )
}

export default App
