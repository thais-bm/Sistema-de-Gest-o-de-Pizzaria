import { useState, useEffect } from 'react'
import axios from "axios"
import './App.css'
import Header from './components/Header';
import PizzaCard from './components/PizzaCard';


function App() {
  const [pizza, setPizza] = useState(null);
  const [erro, setErro] = useState(null);


  useEffect(() => {
    const carregarPizzas = async () => {
      try{
        const response = await axios.get("/api/pizzas.json");
        setPizza(response.data);
      }catch(error){
        console.error("Erro ao carregar pizzas:",error);
        setErro("Falha ao carrrgar as pizzas. Aff")
      }
    };
    carregarPizzas();
  },[]);

  //so pra testar o card dps eu coloco certinho
  useEffect(() => {
    fetch("api/pizzas.json")
      .then(res => res.json())
      .then(data => {
        const pizza1 = data.find(p => p.id === 1);
        setPizza(pizza1);
      })
      .catch(erro => console.error("Erro ao carregar pizza:", erro));
  }, []);

  if (!pizza) return <p>Não tem pizzar</p>;

  return (
   <main>
    <Header/>
    <PizzaCard pizza={pizza}/>
    <PizzaCard pizza={pizza}/>
   </main>
  )
}

export default App
