import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result) {
      // O usuário está no contexto após login
      if (result.role === 'admin') {
        navigate('/admin');
      } else if (result.role === 'cozinha') {
        navigate('/cozinha');
      }
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  


  return (
    <div className='login-container'>
      <h1>Login</h1>
      <p>Faça login para acessar o sistema</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default Login
