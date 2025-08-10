import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Hook para facilitar o uso do contexto de autenticação
export const useAuth = () => {
  return React.useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Função de login (simulada)
  const login = (username, password) => {
    // Exemplo simples: validação mockada
    if (username === 'admin' && password === '123') {
      const userData = { username: 'admin', role: 'admin' };
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Armazena no localStorage
      return true;
    }

    else if (username === 'cozinha' && password === '123') {
      const userData = { username: 'cozinha', role: 'cozinha' };
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Armazena no localStorage
      return true;
    }

    return false;
  };

  // Função de logout
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  // Tenta recuperar a sessão do localStorage ao carregar a página
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};