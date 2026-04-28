import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@FreeRooms:auth');
      if (authDataSerialized) {
        const _user = JSON.parse(authDataSerialized);
        setUser(_user);
      }
    } catch (error) {
      console.error('Error loading auth data', error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email, password) {
    // Mock authentication
    // In a real app, you would call an API
    const usersDataSerialized = await AsyncStorage.getItem('@FreeRooms:users');
    const users = usersDataSerialized ? JSON.parse(usersDataSerialized) : [];
    
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const authUser = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      setUser(authUser);
      await AsyncStorage.setItem('@FreeRooms:auth', JSON.stringify(authUser));
      return { success: true };
    } else {
      return { success: false, message: 'E-mail ou senha inválidos' };
    }
  }

  async function signUp(name, email, password) {
    try {
      const usersDataSerialized = await AsyncStorage.getItem('@FreeRooms:users');
      const users = usersDataSerialized ? JSON.parse(usersDataSerialized) : [];
      
      if (users.some(u => u.email === email)) {
        return { success: false, message: 'E-mail já cadastrado' };
      }
      
      const newUser = { id: Date.now().toString(), name, email, password };
      users.push(newUser);
      
      await AsyncStorage.setItem('@FreeRooms:users', JSON.stringify(users));
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Erro ao criar conta' };
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem('@FreeRooms:auth');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signUp, 
      signOut,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
