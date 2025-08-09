import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');  
  }

  return (
    <div>
      <h1>Página não encontrada</h1>
      <p>Até os grandes aventureiros se perdem às vezes... Mas não se preocupe: estamos aqui para ajudar! Apenas aperte nesse botão para voltar</p>

      <button onClick={handleHomeClick}>Página Inicial</button>

    </div>
  )
}

export default NotFound
