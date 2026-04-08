import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  // Função para favoritar/desfavoritar
  const toggleFavorite = (salaId) => {
    setFavorites(prev => {
      if (prev.includes(salaId)) {
        return prev.filter(id => id !== salaId);
      } else {
        return [...prev, salaId];
      }
    });
  };

  // Função para adicionar ao histórico (evitando duplicatas recentes)
  const addToHistory = (sala) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.id !== sala.id);
      return [sala, ...filtered].slice(0, 10); // Mantém apenas os 10 últimos
    });
  };

  return (
    <AppContext.Provider value={{ favorites, toggleFavorite, history, addToHistory }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
