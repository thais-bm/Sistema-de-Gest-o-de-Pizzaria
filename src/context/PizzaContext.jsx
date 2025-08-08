import React, { createContext, useState, useContext } from 'react';

const PizzaContext = createContext();

export function PizzaProvider({ children }) {
  const [pizzaSelecionada, setPizzaSelecionada] = useState(null);

  return (
    <PizzaContext.Provider value={{ pizzaSelecionada, setPizzaSelecionada }}>
      {children}
    </PizzaContext.Provider>
  );
}

export function usePizza() {
  return useContext(PizzaContext);
}
