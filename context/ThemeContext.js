import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme || 'light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('@FreeRooms:theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.error('Failed to load theme', e);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('@FreeRooms:theme', newTheme);
    } catch (e) {
      console.error('Failed to save theme', e);
    }
  };

  const colors = theme === 'light' ? {
    primary: '#ED1C24', // Vermelho FIAP
    background: '#F2F2F7',
    surface: '#FFFFFF',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
    error: '#FF3B30',
    success: '#34C759',
    card: '#FFFFFF',
    tabBar: '#FFFFFF',
    status: {
      livre: '#4CAF50',
      ocupada: '#F44336',
      manutencao: '#FF9800',
    }
  } : {
    primary: '#FF3B30', // Red for dark mode
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    error: '#FF453A',
    success: '#32D74B',
    card: '#1C1C1E',
    tabBar: '#1C1C1E',
    status: {
      livre: '#4CAF50',
      ocupada: '#F44336',
      manutencao: '#FF9800',
    }
  };


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
